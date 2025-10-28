import { TestBed } from '@angular/core/testing';
import { RequestQuestionSidebarComponent } from './request-question-sidebar.component';

describe('RequestQuestionSidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestQuestionSidebarComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RequestQuestionSidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have empty items by default', () => {
    const fixture = TestBed.createComponent(RequestQuestionSidebarComponent);
    const component = fixture.componentInstance;
    expect(component.items()).toEqual([]);
  });

  it('should have null activeItemId by default', () => {
    const fixture = TestBed.createComponent(RequestQuestionSidebarComponent);
    const component = fixture.componentInstance;
    expect(component.activeItemId()).toBeNull();
  });

  it('should emit itemClick when onItemClick is called', () => {
    const fixture = TestBed.createComponent(RequestQuestionSidebarComponent);
    const component = fixture.componentInstance;
    
    const testItem = { id: '1', title: 'Test Item' };
    spyOn(component.itemClick, 'emit');
    
    component.onItemClick(testItem);
    
    expect(component.itemClick.emit).toHaveBeenCalledWith(testItem);
  });
});

