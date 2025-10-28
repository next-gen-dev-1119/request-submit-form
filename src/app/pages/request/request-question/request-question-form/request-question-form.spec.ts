import { TestBed } from '@angular/core/testing';
import { RequestQuestionForm } from './request-question-form';
import { RequestService } from '../../../../shared/apis/requests.service';
import { of } from 'rxjs';

describe('RequestQuestionForm', () => {
  let mockRequestService: jasmine.SpyObj<RequestService>;

  beforeEach(async () => {
    mockRequestService = jasmine.createSpyObj('RequestService', ['updateQuestion']);
    mockRequestService.updateQuestion.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      imports: [RequestQuestionForm],
      providers: [
        { provide: RequestService, useValue: mockRequestService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestQuestionForm);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have empty fields by default', () => {
    const fixture = TestBed.createComponent(RequestQuestionForm);
    const component = fixture.componentInstance;
    expect(component.fields()).toEqual([]);
  });

  it('should create form on initialization', () => {
    const fixture = TestBed.createComponent(RequestQuestionForm);
    const component = fixture.componentInstance;
    
    fixture.detectChanges();
    
    expect(component.form).toBeTruthy();
  });

  it('should emit formCreated when form is created', () => {
    const fixture = TestBed.createComponent(RequestQuestionForm);
    const component = fixture.componentInstance;
    
    spyOn(component.formCreated, 'emit');
    
    fixture.detectChanges();
    
    expect(component.formCreated.emit).toHaveBeenCalled();
  });
});

