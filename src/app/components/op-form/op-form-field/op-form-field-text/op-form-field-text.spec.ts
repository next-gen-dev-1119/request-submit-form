import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OpFormFieldText } from './op-form-field-text';

describe('OpFormFieldText', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpFormFieldText, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpFormFieldText);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should write value to form control', () => {
    const fixture = TestBed.createComponent(OpFormFieldText);
    const component = fixture.componentInstance;
    
    component.writeValue('test value');
    
    expect(component.control.value).toBe('test value');
  });

  it('should update value when control changes', () => {
    const fixture = TestBed.createComponent(OpFormFieldText);
    const component = fixture.componentInstance;
    
    let emittedValue: any;
    component.registerOnChange((value) => {
      emittedValue = value;
    });
    
    component.control.setValue('new value');
    
    expect(emittedValue).toBe('new value');
  });
});

