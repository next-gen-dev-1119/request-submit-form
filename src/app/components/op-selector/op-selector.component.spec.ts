import { TestBed } from '@angular/core/testing';
import { OpSelectorComponent } from './op-selector.component';

describe('OpSelectorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpSelectorComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OpSelectorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have empty options by default', () => {
    const fixture = TestBed.createComponent(OpSelectorComponent);
    const component = fixture.componentInstance;
    expect(component.options()).toEqual([]);
  });

  it('should have null selected by default', () => {
    const fixture = TestBed.createComponent(OpSelectorComponent);
    const component = fixture.componentInstance;
    expect(component.selected()).toBeNull();
  });

  it('should emit selectionChange when selectOption is called', () => {
    const fixture = TestBed.createComponent(OpSelectorComponent);
    const component = fixture.componentInstance;
    
    spyOn(component.selectionChange, 'emit');
    
    component.selectOption('test-option');
    
    expect(component.selectionChange.emit).toHaveBeenCalledWith('test-option');
  });
});

