import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OpOption {
  id: string | number;
  label: string;
  value: any;
}

@Component({
  selector: 'app-op-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2 items-center">
      @for (option of options(); track option.id) {
      <button
        type="button"
        (click)="onChipClick(option)"
        [class]="getChipClasses(option)"
      >
        {{ option.label }}
      </button>
      }
    </div>
  `,
  styleUrl: './op-selector.component.scss',
})
export class OpSelectorComponent {
  options = input.required<OpOption[]>();
  selected = input<any>(null);
  selectionChange = output<any>();

  constructor() { }

  onChipClick(option: OpOption): void {
    const newValue = this.isSelected(option) ? null : option.value;
    this.selectionChange.emit(newValue);
  }

  isSelected(option: OpOption): boolean {
    return this.selected() === option.value;
  }

  getChipClasses(option: OpOption): string {
    const baseClasses =
      'px-3 flex items-center rounded-full border-[1px] transition-colors duration-200 cursor-pointer text-sm';
    const isSelected = this.isSelected(option);

    if (isSelected) {
      return `${baseClasses} h-8 bg-primary-most-light font-semibold text-primary border-primary`;
    } else {
      return `${baseClasses} h-[42px] bg-white font-medium text-text border-[#E5E5E5] hover:border-gray-400`;
    }
  }
}

