import { TestBed } from '@angular/core/testing';
import { RequestCompleteComponent } from './request-complete.component';
import { RequestStateService } from '../../../shared/state/request.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('RequestCompleteComponent', () => {
  let mockRequestStateService: jasmine.SpyObj<RequestStateService>;

  beforeEach(async () => {
    mockRequestStateService = jasmine.createSpyObj('RequestStateService', [
      'resetRequest',
      'answersById',
    ]);
    
    Object.defineProperty(mockRequestStateService, 'schemaSignal', {
      value: signal(null),
      writable: false
    });

    await TestBed.configureTestingModule({
      imports: [RequestCompleteComponent],
      providers: [
        provideRouter([]),
        { provide: RequestStateService, useValue: mockRequestStateService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call resetRequest when resetRequest is called', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    component.resetRequest();
    
    expect(mockRequestStateService.resetRequest).toHaveBeenCalled();
  });

  it('should format boolean true as "Yes"', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.formatDisplayValue(true)).toBe('Yes');
  });

  it('should format boolean false as "No"', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.formatDisplayValue(false)).toBe('No');
  });

  it('should format null as "not answered"', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.formatDisplayValue(null)).toBe('not answered');
  });

  it('should format empty string as "not answered"', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.formatDisplayValue('')).toBe('not answered');
  });

  it('should format string values as is', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.formatDisplayValue('Test Answer')).toBe('Test Answer');
  });

  it('should identify null as not answered', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.isNotAnswered(null)).toBe(true);
  });

  it('should identify empty string as not answered', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.isNotAnswered('')).toBe(true);
  });

  it('should identify non-empty values as answered', () => {
    const fixture = TestBed.createComponent(RequestCompleteComponent);
    const component = fixture.componentInstance;
    
    expect(component.isNotAnswered('Answer')).toBe(false);
    expect(component.isNotAnswered(true)).toBe(false);
    expect(component.isNotAnswered(false)).toBe(false);
  });
});

