import { TestBed } from '@angular/core/testing';
import { RequestStartComponent } from './request-start.component';
import { SchemaService } from '../../../common/apis/schema.service';
import { RequestStateService } from '../../../common/state/request.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('RequestStartComponent', () => {
  let mockSchemaService: jasmine.SpyObj<SchemaService>;
  let mockRequestStateService: jasmine.SpyObj<RequestStateService>;

  beforeEach(async () => {
    mockSchemaService = jasmine.createSpyObj('SchemaService', ['getSchemas']);
    mockRequestStateService = jasmine.createSpyObj('RequestStateService', ['startNewRequest']);

    mockSchemaService.getSchemas.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [RequestStartComponent],
      providers: [
        provideRouter([]),
        { provide: SchemaService, useValue: mockSchemaService },
        { provide: RequestStateService, useValue: mockRequestStateService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestStartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load schemas on init', () => {
    const fixture = TestBed.createComponent(RequestStartComponent);
    const component = fixture.componentInstance;
    
    expect(mockSchemaService.getSchemas).toHaveBeenCalled();
  });
});

