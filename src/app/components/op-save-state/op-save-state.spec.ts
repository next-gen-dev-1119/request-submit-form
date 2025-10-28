import { TestBed } from '@angular/core/testing';
import { OpSaveStateComponent } from './op-save-state';
import { OpSaveStateService } from './op-save-state.service';

describe('OpSaveStateComponent', () => {
  let mockSaveStateService: jasmine.SpyObj<OpSaveStateService>;

  beforeEach(async () => {
    mockSaveStateService = jasmine.createSpyObj('OpSaveStateService', ['show', 'clear']);

    await TestBed.configureTestingModule({
      imports: [OpSaveStateComponent],
      providers: [
        { provide: OpSaveStateService, useValue: mockSaveStateService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpSaveStateComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

