import { TestBed } from '@angular/core/testing';
import { QuestionContainerComponent } from './question-container.component';

describe('QuestionContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionContainerComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(QuestionContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render content projected into it', () => {
    const fixture = TestBed.createComponent(QuestionContainerComponent);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.question-container');
    
    expect(container).toBeTruthy();
  });

  it('should have proper styling classes', () => {
    const fixture = TestBed.createComponent(QuestionContainerComponent);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.question-container');
    
    expect(container).toBeTruthy();
    expect(container?.classList.contains('question-container')).toBe(true);
  });
});

