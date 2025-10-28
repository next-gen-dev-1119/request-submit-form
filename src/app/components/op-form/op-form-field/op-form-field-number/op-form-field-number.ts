import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpFormFieldBase } from '../op-form-field-base';
import { OpFormFieldError } from '../op-form-field-error/op-form-field-error';

@Component({
  selector: 'app-op-form-field-number',
  standalone: true,
  imports: [OpFormFieldError],
  template: `
    <label [for]="id()">{{ label() }}</label>
    <input
      type="number"
      [id]="id()"
      [attr.name]="id() || null"
      [attr.placeholder]="placeholder() || null"
      [required]="required()"
      [disabled]="disabled"
      [value]="value ?? ''"
      (input)="onNumberInput($event)"
      (blur)="emitBlur($event)"
    />
    <app-op-form-field-error
      [touched]="ngControl.touched"
      [errors]="ngControl.errors"
    />
  `,
  styleUrl: './op-form-field-number.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpFormFieldNumber extends OpFormFieldBase<number | null> {
  onNumberInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    if (value === '') {
      this.emitChange(null);
      return;
    }
    const parsed = Number(value);
    this.emitChange(Number.isNaN(parsed) ? null : parsed);
  }
}
