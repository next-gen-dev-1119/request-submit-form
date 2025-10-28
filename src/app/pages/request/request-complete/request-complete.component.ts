import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RequestStateService } from '../../../shared/state/request.service';
import { OpButtonComponent } from '../../../components/op-button/op-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-complete',
  standalone: true,
  imports: [OpButtonComponent],
  template: `
    <div
      class="flex max-w-[720px] mx-auto my-32 bg-white px-[72px] py-[56px] rounded-lg"
    >
      <div class="request-complete-container w-full text-center">
        <div class="flex flex-col gap-2 items-center justify-center mt-8">
          <img src="cake.png" alt="cake" />
          <h1 class="text-2xl font-bold">Awesome</h1>
          <p class="text-[#8B92A0] font-medium text-sm">It works!</p>
        </div>
        <div class="mt-[40px] h-6 flex items-center">
          <h2 class="text-base text-left text-semibold text-[#5A606D]">Summary</h2>
        </div>
        @for (answer of summaryAnswers(); track answer.id) {
        <div
          class="flex gap-2 items-center justify-center h-9 mt-2 border-b-[1px] border-[#F8F8F8] text-sm"
        >
          <div class="w-3/4 text-left font-semibold text-text-secondary">{{ answer.label }}</div>
          <div
            class="w-1/4 text-left font-medium"
            [class.text-[#CCCCCC]]="isNotAnswered(answer.value)"
            [class.text-text]="!isNotAnswered(answer.value)"
          >
            {{ formatDisplayValue(answer.value) }}
          </div>
        </div>
        }
        <footer class="flex items-center justify-center mt-10">
          <app-op-button variant="primary" size="fluid" class="w-full max-w-[220px]" (click)="resetRequest()"
            >Complete the flow and Reset</app-op-button
          >
        </footer>
      </div>
    </div>
  `,
  styleUrl: './request-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestCompleteComponent  {
  private state = inject(RequestStateService);
  private schema = this.state.schemaSignal;
  private router = inject(Router);
  
  summaryAnswers = computed(() => {
    return Object.values(this.schema()?.sections || {}).reduce(
      (acc, section) => {
        const sectionAnswers = section.fields.map((field) => ({
          id: field.id,
          label: field.label,
          value: this.state.answersById(field.id),
        }));
        return acc.concat(sectionAnswers);
      },
      [] as any[]
    );
  });

  formatDisplayValue(value: any): string {
    // Handle null or empty string
    if (value === null || value === '') {
      return 'not answered';
    }
    
    // Handle boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // Handle all other values (strings, numbers, etc.)
    return String(value);
  }

  isNotAnswered(value: any): boolean {
    return value === null || value === '';
  }

  resetRequest(): void {
    this.state.resetRequest();
    this.router.navigate(['request']);
  }
}