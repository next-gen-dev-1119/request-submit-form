import { TestBed } from '@angular/core/testing';
import { OpButtonComponent } from './op-button.component';

describe('OpButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpButtonComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    const fixture = TestBed.createComponent(OpButtonComponent);
    const component = fixture.componentInstance;
    expect(component.variant()).toBe('primary');
  });

  it('should have default size as medium', () => {
    const fixture = TestBed.createComponent(OpButtonComponent);
    const component = fixture.componentInstance;
    expect(component.size()).toBe('medium');
  });

  it('should not be disabled by default', () => {
    const fixture = TestBed.createComponent(OpButtonComponent);
    const component = fixture.componentInstance;
    expect(component.disabled()).toBe(false);
  });
});

