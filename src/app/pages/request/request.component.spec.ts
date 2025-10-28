import { TestBed } from '@angular/core/testing';
import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

