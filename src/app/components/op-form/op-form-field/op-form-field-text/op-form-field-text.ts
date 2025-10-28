import { Component, input } from '@angular/core';
import { OpFormFieldBase } from '../op-form-field-base';
import { OpFormFieldError } from '../op-form-field-error/op-form-field-error';

@Component({
  selector: 'app-op-form-field-text',
  standalone: true,
  imports: [OpFormFieldError],
  template: `
    <div class="flex flex-col gap-2 w-full">
      <label [for]="id()" class="text-sm font-medium text-text-secondary">
        {{ label() }}
        @if(required()) {
        <span class="text-red-500">*</span>
        }
      </label>
      <input
        [type]="type()"
        [id]="id()"
        [attr.name]="id() || null"
        [attr.placeholder]="placeholder() || null"
        [required]="required()"
        [disabled]="disabled"
        [value]="value ?? ''"
        (input)="onTextInput($event)"
        (blur)="emitBlur($event)"
        class="input h-12 p-3"
      />
      <app-op-form-field-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </div>
  `,
  styleUrl: './op-form-field-text.scss',
})
export class OpFormFieldText extends OpFormFieldBase<string> {
  type = input<string>('text');

  constructor() {
    super();
  }

  onTextInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.emitChange(value);

    this.ngControl?.control;
  }
}
