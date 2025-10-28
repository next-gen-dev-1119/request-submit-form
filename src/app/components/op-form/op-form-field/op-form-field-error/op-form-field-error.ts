import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-op-form-field-error',
  standalone: true,
  imports: [JsonPipe],
  template: `<div>
    <p class="text-xs text-red-500 m-0 p-0">
      @if(touched() && errors()) {
        {{ getErrros() }}
      }
    </p>
  </div>`,
  styleUrl: './op-form-field-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpFormFieldError {
  touched = input<boolean | null>();
  errors = input<ValidationErrors | null>();

  getErrros() {
    if (this.errors()?.['required']) {
      return 'Required field';
    } else {
      return '';
    }
  }
}
