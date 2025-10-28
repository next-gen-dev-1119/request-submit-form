import { TestBed } from '@angular/core/testing';
import { RequestQuestionComponent } from './request-question.component';
import { RequestStateService } from '../../../common/state/request.service';
import { RequestService } from '../../../common/apis/requests.service';
import { OpSaveStateService } from '../../../components/op-save-state/op-save-state.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('RequestQuestionComponent', () => {
  let mockRequestStateService: jasmine.SpyObj<RequestStateService>;
  let mockRequestService: jasmine.SpyObj<RequestService>;
  let mockSaveStateService: jasmine.SpyObj<OpSaveStateService>;

  beforeEach(async () => {
    mockRequestStateService = jasmine.createSpyObj('RequestStateService', [
      'nextSection',
      'previousSection',
      'goToSection',
      'saveAnswerLocally',
      'isRequestInProgress',
      'answersBySection',
    ]);
    
    mockRequestStateService.currentSection = signal(null);
    mockRequestStateService.currentSectionIndexSignal = signal(0);
    mockRequestStateService.schemaSignal = signal(null);

    mockRequestService = jasmine.createSpyObj('RequestService', ['updateQuestion']);
    mockSaveStateService = jasmine.createSpyObj('OpSaveStateService', ['show']);

    await TestBed.configureTestingModule({
      imports: [RequestQuestionComponent],
      providers: [
        provideRouter([]),
        { provide: RequestStateService, useValue: mockRequestStateService },
        { provide: RequestService, useValue: mockRequestService },
        { provide: OpSaveStateService, useValue: mockSaveStateService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestQuestionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

