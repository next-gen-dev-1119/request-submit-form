import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OpFormFieldRadio } from './op-form-field-radio';

describe('OpFormFieldRadio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpFormFieldRadio, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpFormFieldRadio);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should write value to form control', () => {
    const fixture = TestBed.createComponent(OpFormFieldRadio);
    const component = fixture.componentInstance;
    
    component.writeValue('option1');
    
    expect(component.control.value).toBe('option1');
  });

  it('should have empty options by default', () => {
    const fixture = TestBed.createComponent(OpFormFieldRadio);
    const component = fixture.componentInstance;
    
    expect(component.options()).toEqual([]);
  });
});

