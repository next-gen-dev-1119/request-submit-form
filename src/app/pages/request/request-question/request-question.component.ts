import { Component, computed, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestStateService } from '../../../common/state/request.service';
import { Field } from '../../../common/types';
import { RequestQuestionForm } from './request-question-form/request-question-form';
import { catchError, debounceTime, defer, distinctUntilChanged, of, retry, switchMap, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequestService } from '../../../common/apis/requests.service';
import { OpSaveStateService } from '../../../components/op-save-state/op-save-state.service';
import { RequestQuestionSidebarComponent, SidebarItem } from './request-question-sidebar/request-question-sidebar.component';
import { OpButtonComponent } from '../../../components/op-button/op-button.component';
import { OpSaveStateComponent } from '../../../components/op-save-state/op-save-state';
@Component({
  selector: 'app-request-question',
  standalone: true,
  imports: [
    CommonModule,
    RequestQuestionForm,
    RequestQuestionSidebarComponent,
    OpButtonComponent,
    OpSaveStateComponent,
  ],
  template: `
    <div class="flex h-screen max-w-5xl mx-auto mt-32 gap-8">
      <div class="sidebar w-1/4">
        <app-request-question-sidebar
          [items]="sidebarItems()"
          [activeItemId]="currentSection()?.id ?? null"
        />
      </div>
      <div class="w-3/4">
        <div class="flex justify-between items-center mb-3">
          <h1 class="text-lg text-text font-semibold">{{ currentSection()?.title }}</h1>
          <app-op-save-state></app-op-save-state>
        </div>
        <app-request-question-form
          class="main w-full"
          [fields]="fields()"
          (formCreated)="onFormCreated($event)"
        >
          @if(form) { @if (currentSectionIndex() > 0) {
            <app-op-button
              (click)="prevSection()"
              variant="secondary"
            >
              PREVIOUS
            </app-op-button>
          }

          <app-op-button
            (click)="nextSection()"
            [disabled]="form.invalid"
            variant="primary"
          >
            {{ isFinalSection() ? 'SUBMIT' : 'NEXT' }}
          </app-op-button>
          }
        </app-request-question-form>
      </div>
    </div>
  `,
  styleUrl: './request-question.component.scss',
})
export class RequestQuestionComponent {
  private state = inject(RequestStateService);
  private router = inject(Router);
  private requestService = inject(RequestService);
  private destroyRef = inject(DestroyRef);
  private saveStateService = inject(OpSaveStateService);
  form: FormGroup | null = null;

  currentSection = this.state.currentSection;
  currentSectionIndex = this.state.currentSectionIndexSignal;
  schema = this.state.schemaSignal;

  isFinalSection = computed(() => {
    return (
      this.currentSectionIndex() === (this.schema()?.sections.length || 0) - 1
    );
  });

  fields = computed<Field[]>(() => this.currentSection()?.fields || []);

  sidebarItems = computed<SidebarItem[]>(() => {
    return (
      this.schema()?.sections.map((section) => ({
        id: section.id,
        title: section.title,
      })) || []
    );
  });

  onSidebarItemClick(item: SidebarItem): void {
    const sectionIndex = this.schema()?.sections.findIndex(
      (s) => s.id === item.id
    );
    if (sectionIndex !== undefined && sectionIndex !== -1) {
      const sectionId = this.schema()?.sections[sectionIndex].id;
      this.state.goToSection(sectionIndex);
      this.router.navigate([
        'request',
        'section',
        this.schema()?.id,
        sectionId ?? '',
      ]);
    }
  }

  onFormCreated(form: FormGroup): void {
    this.form = form;
    if (this.state.isRequestInProgress()) {
      this.form.patchValue(
        this.state.answersBySection(this.currentSection()!.id)
      );
    }
    this.listenToFormChanges(this.form);
  }

  private listenToFormChanges(form: FormGroup): void {
    Object.entries(form.controls).forEach(([key, control]) => {
      control.valueChanges
        .pipe(
          tap((value) => {
            if (this.currentSection()) {
              this.state.saveAnswerLocally(
                this.currentSection()!.id,
                key,
                value
              );
            }
          }),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((value) => {
            return defer(() => {
              // Show "Saving..." each time the API call is made (including retries)
              this.saveStateService.show('info', 'Saving...');
              return this.requestService.updateQuestion('123', key, { value });
            }).pipe(
              tap((response) => {
                // Success case - show saved message
                if (response?.success) {
                  this.saveStateService.show('success', 'Saved');
                }
              }),
              retry({
                count: 2,
                delay: (error, retryCount) => {
                  this.saveStateService.show('error', 'Error');
                  return timer(500).pipe(
                    tap(() => this.saveStateService.show('info', 'Retrying...'))
                  );
                }
              }),
              catchError(() => {
                this.saveStateService.show('error', 'Error');
                return of({ success: false });
              })
            );
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    });
  }

  nextSection() {
    if (this.isFinalSection()) {
      this.router.navigate(['request', 'complete']);
      return;
    }

    this.state.nextSection();
    this.router.navigate([
      'request',
      'section',
      this.schema()?.id,
      this.state.currentSectionIndexSignal(),
    ]);
  }

  prevSection() {
    this.state.previousSection();
    this.router.navigate([
      'request',
      'section',
      this.schema()?.id,
      this.state.currentSectionIndexSignal(),
    ]);
  }
}
