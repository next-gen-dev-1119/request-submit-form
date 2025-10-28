import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpFormFieldBase } from '../op-form-field-base';
import { OpFormFieldError } from '../op-form-field-error/op-form-field-error';

@Component({
  selector: 'app-op-form-field-toggle',
  standalone: true,
  imports: [OpFormFieldError],
  template: `
    <label class="toggle">
      <input
        type="checkbox"
        [id]="id()"
        [attr.name]="id() || null"
        [required]="required()"
        [disabled]="disabled"
        [checked]="value ?? false"
        (change)="onToggleChange($event)"
        (blur)="markAsTouched()"
      />
      <span>{{ label() }}</span>
      <app-op-form-field-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </label>
  `,
  styleUrl: './op-form-field-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpFormFieldToggle extends OpFormFieldBase<boolean> {
  onToggleChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;
    this.emitChange(!!checked);
  }
}
