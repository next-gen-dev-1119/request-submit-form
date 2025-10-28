import { TestBed } from '@angular/core/testing';
import { OpLoaderComponent } from './op-loader.component';

describe('OpLoaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpLoaderComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpLoaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render spinner element', () => {
    const fixture = TestBed.createComponent(OpLoaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });
});

