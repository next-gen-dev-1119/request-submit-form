import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OpFormFieldToggle } from './op-form-field-toggle';

describe('OpFormFieldToggle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpFormFieldToggle, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpFormFieldToggle);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should write value to form control', () => {
    const fixture = TestBed.createComponent(OpFormFieldToggle);
    const component = fixture.componentInstance;
    
    component.writeValue(true);
    
    expect(component.control.value).toBe(true);
  });

  it('should default to false', () => {
    const fixture = TestBed.createComponent(OpFormFieldToggle);
    const component = fixture.componentInstance;
    
    expect(component.control.value).toBe(false);
  });

  it('should toggle value when onToggle is called', () => {
    const fixture = TestBed.createComponent(OpFormFieldToggle);
    const component = fixture.componentInstance;
    
    component.control.setValue(false);
    component.onToggle();
    
    expect(component.control.value).toBe(true);
    
    component.onToggle();
    
    expect(component.control.value).toBe(false);
  });
});

