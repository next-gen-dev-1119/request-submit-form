import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'default' | 'fluid';

@Component({
  selector: 'app-op-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled()"
      [class]="getButtonClasses()"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './op-button.component.scss',
})
export class OpButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('default');
  disabled = input<boolean>(false);

  click = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) {
      this.click.emit(event);
    }
  }

  getButtonClasses(): string {
    const baseClasses =
      'font-bold rounded-[4px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Size classes
    const sizeClasses = this.getSizeClasses();

    // Variant classes
    const variantClasses = this.getVariantClasses();

    // Disabled classes
    const disabledClasses = this.disabled()
      ? 'opacity-50 cursor-not-allowed'
      : '';

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses}`.trim();
  }

  private getSizeClasses(): string {
    const size = this.size();

    if (size === 'fluid') {
      return 'h-[40px] w-full px-4 py-2 text-sm text-left';
    }

    return 'h-8 px-4 py-2 text-xs text-center';
  }

  private getVariantClasses(): string {
    const variant = this.variant();
    const isDisabled = this.disabled();

    switch (variant) {
      case 'primary':
        return isDisabled
          ? 'bg-primary text-white'
          : 'bg-primary text-white hover:bg-primary-hover focus:ring-primary';

      case 'secondary':
        return isDisabled
          ? 'bg-transparent text-text border-[1px] border-[#E5E5E5] opacity-50'
          : 'bg-transparent text-text border-[1px] border-[#E5E5E5] hover:bg-gray-100';

      default:
        return '';
    }
  }
}

