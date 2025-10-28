import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Field } from '../../../../common/types';
import { OpFormFieldText } from '../../../../components/op-form/op-form-field/op-form-field-text/op-form-field-text';
import { OpFormFieldNumber } from '../../../../components/op-form/op-form-field/op-form-field-number/op-form-field-number';
import { OpFormFieldRadio } from '../../../../components/op-form/op-form-field/op-form-field-radio/op-form-field-radio';
import { OpFormFieldToggle } from '../../../../components/op-form/op-form-field/op-form-field-toggle/op-form-field-toggle';
import { RequestService } from '../../../../common/apis/requests.service';
import { catchError, of, retry } from 'rxjs';
import { QuestionContainerComponent } from './question-container/question-container.component';

@Component({
  selector: 'app-request-question-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OpFormFieldText,
    OpFormFieldNumber,
    OpFormFieldRadio,
    OpFormFieldToggle,
    QuestionContainerComponent,
  ],
  template: `
    <form [formGroup]="form">
      <div class="flex flex-col gap-3 mb-3">
        @for (field of fields; track field.id) {
        <app-question-container>
          @switch (field.type) { @case ('text') {
          <app-op-form-field-text
            [type]="field.type"
            [id]="field.id.toString()"
            [label]="field.label"
            [required]="field.required ?? false"
            [formControlName]="field.id.toString()"
          />
          } @case ('number') {
          <app-op-form-field-text
            [type]="field.type"
            [id]="field.id.toString()"
            [label]="field.label"
            [required]="field.required ?? false"
            [formControlName]="field.id.toString()"
          />
          } @case ('toggle') {
          <app-op-form-field-toggle
            [id]="field.id.toString()"
            [label]="field.label"
            [required]="field.required ?? false"
            [formControlName]="field.id.toString()"
          />
          } @case ('radio') {
          <app-op-form-field-radio
            [id]="field.id.toString()"
            [label]="field.label"
            [required]="field.required ?? false"
            [formControlName]="field.id.toString()"
            [options]="field.options"
          />
          } @default {
          <p>Unsupported field type: {{ field.type }}</p>
          } }
        </app-question-container>
        }
      </div>
      <div class="flex gap-3">
        <ng-content></ng-content>
      </div>
    </form>
  `,
  styleUrl: './request-question-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestQuestionForm {
  private fb = inject(FormBuilder);
  private requestService = inject(RequestService);

  private _fields: Field[] = [];

  @Input()
  set fields(value: Field[]) {
    if (value === this._fields) {
      return;
    }
    this._fields = value ?? [];
    this.rebuildForm();
  }
  get fields(): Field[] {
    return this._fields;
  }

  @Input()
  formClass = '';

  @Output()
  formCreated = new EventEmitter<FormGroup>();

  form: FormGroup = this.fb.group({});

  private rebuildForm(): void {
    const controls: Record<string, any> = {};
    for (const field of this.fields) {
      const controlName = field.id.toString();
      const validators = field.required ? [Validators.required] : [];
      const previousControl = this.form.get(controlName);
      const defaultValue =
        previousControl?.value ??
        field.default ??
        (field.type === 'number' ? null : '');
      controls[controlName] = this.fb.control(defaultValue, validators);
    }
    this.form = this.fb.group(controls);
    this.formCreated.emit(this.form);
  }
}
