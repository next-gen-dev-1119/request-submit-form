import { TestBed } from '@angular/core/testing';
import { OpFormFieldError } from './op-form-field-error';

describe('OpFormFieldError', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpFormFieldError],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpFormFieldError);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display error message when provided', () => {
    const fixture = TestBed.createComponent(OpFormFieldError);
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('This field is required');
  });
});

