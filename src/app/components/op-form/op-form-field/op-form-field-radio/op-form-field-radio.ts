import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OpFormFieldBase } from '../op-form-field-base';
import { OpFormFieldError } from '../op-form-field-error/op-form-field-error';

@Component({
  selector: 'app-op-form-field-radio',
  standalone: true,
  imports: [OpFormFieldError],
  template: `
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm font-medium text-text-secondary">
        {{ label() }}
        @if(required()) {
          <span class="text-red-500">*</span>
        }
      </label>
      
      <div class="flex flex-wrap gap-2">
        @for (option of options(); track option; let idx = $index) {
          <label 
            [for]="optionId(idx)"
            [class]="getOptionClasses(option)"
          >
            <input
              type="radio"
              [id]="optionId(idx)"
              [name]="groupName"
              [value]="option"
              [checked]="value === option"
              [required]="required() && idx === 0"
              [disabled]="disabled"
              (change)="onSelectionChange(option)"
              (blur)="markAsTouched()"
              class="hidden"
            />
            <span class="flex items-center gap-2">
              <span class="radio-indicator"></span>
              <span>{{ option }}</span>
            </span>
          </label>
        }
      </div>
      
      <app-op-form-field-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </div>
  `,
  styleUrl: './op-form-field-radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpFormFieldRadio extends OpFormFieldBase<string | null> {
  private readonly fallbackName = `radio-${Math.random()
    .toString(36)
    .slice(2)}`;

  options = input<string[] | undefined>([]);

  get groupName(): string {
    return this.id() || this.fallbackName;
  }

  optionId(index: number): string {
    return `${this.groupName}-${index}`;
  }

  onSelectionChange(option: string): void {
    this.emitChange(option);
  }

  getOptionClasses(option: string): string {
    const baseClasses = 'h-8 px-3 py-[10px] inline-flex items-center rounded-full border-[1px] cursor-pointer transition-colors font-medium duration-200 text-xs radio-container';
    const isSelected = this.value === option;
    
    if (isSelected) {
      return `${baseClasses} bg-primary-light text-primary border-primary`;
    }
    
    return `${baseClasses} bg-white text-text border-[#E5E5E5] hover:border-gray-400`;
  }
}
