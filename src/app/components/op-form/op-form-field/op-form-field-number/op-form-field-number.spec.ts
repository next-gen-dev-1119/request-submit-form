import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OpFormFieldNumber } from './op-form-field-number';

describe('OpFormFieldNumber', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpFormFieldNumber, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpFormFieldNumber);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should write value to form control', () => {
    const fixture = TestBed.createComponent(OpFormFieldNumber);
    const component = fixture.componentInstance;
    
    component.writeValue(42);
    
    expect(component.control.value).toBe(42);
  });

  it('should handle null value', () => {
    const fixture = TestBed.createComponent(OpFormFieldNumber);
    const component = fixture.componentInstance;
    
    component.writeValue(null);
    
    expect(component.control.value).toBeNull();
  });
});

