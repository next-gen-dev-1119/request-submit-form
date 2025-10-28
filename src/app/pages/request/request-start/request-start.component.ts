import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { Schema } from '../../../shared/types';
import { SchemaService } from '../../../shared/apis/schema.service';
import { Router } from '@angular/router';
import { RequestStateService } from '../../../shared/state/request.service';
import { OpSelectorComponent, OpOption } from '../../../components/op-selector/op-selector.component';
import { OpButtonComponent } from '../../../components/op-button/op-button.component';
import { OpLoaderComponent } from '../../../components/op-loader/op-loader.component';

@Component({
  selector: 'app-request-start',
  standalone: true,
  imports: [OpSelectorComponent, OpButtonComponent, OpLoaderComponent],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="request-start">
        <h1 class="text-xl text-text font-bold mb-8">
          What do you need to purchase?
        </h1>

        <div class="w-full flex flex-col items-center justify-center">
          @if (isLoading()) {
            <app-op-loader />
          } @else {
            <app-op-selector
              [options]="chipOptions()"
              [selected]="selectedSchemaId()"
              (selectionChange)="onSchemaSelect($event)"
            />

            <div class="mt-8 w-full max-w-[147px]">
              <app-op-button
                (click)="start()"
                [disabled]="!selectedSchemaSignal()"
                variant="primary"
                size="fluid"
              >
                Start
              </app-op-button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './request-start.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStartComponent implements OnInit {
  private schemaService = inject(SchemaService);
  private router = inject(Router);
  private state = inject(RequestStateService);
  selectedSchemaSignal = signal<Schema | null>(null);
  schemasSignal = signal<Schema[]>([]);
  isLoading = signal<boolean>(true);

  // Computed signal for chip options
  chipOptions = computed<OpOption[]>(() => {
    return this.schemasSignal().map((schema) => ({
      id: schema.id,
      label: schema.title,
      value: schema.id,
    }));
  });

  // Computed signal for selected schema ID
  selectedSchemaId = computed<string | null>(() => {
    return this.selectedSchemaSignal()?.id ?? null;
  });

  ngOnInit(): void {
    this.isLoading.set(true);
    this.schemaService.getSchemas().subscribe((schemas) => {
      this.schemasSignal.set(schemas);
      this.isLoading.set(false);
    });
  }

  onSchemaSelect(schemaId: string | null): void {
    if (schemaId) {
      const schema = this.schemasSignal().find((s) => s.id === schemaId);
      this.selectedSchemaSignal.set(schema ?? null);
    } else {
      this.selectedSchemaSignal.set(null);
    }
  }

  start(): void {
    const schema = this.selectedSchemaSignal();
    if (!schema) {
      return;
    }

    this.state.startNewRequest(schema);
    this.router.navigate(['request/section', schema.id, schema.sections[0].id ?? '']);
  }
}
