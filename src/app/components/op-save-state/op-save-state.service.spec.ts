import { TestBed } from '@angular/core/testing';
import { OpSaveStateService } from './op-save-state.service';

describe('OpSaveStateService', () => {
  let service: OpSaveStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpSaveStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have state by default', () => {
    expect(service.state()).toBeNull();
  });

  it('should show state with message and type', () => {
    service.show('success', 'Test message');
    
    expect(service.state()).toBeTruthy();
    expect(service.state()?.message).toBe('Test message');
    expect(service.state()?.type).toBe('success');
  });

  it('should clear state', () => {
    service.show('info', 'Test');
    service.clear();
    
    expect(service.state()).toBeNull();
  });

  it('should clear existing timeout when showing new state', () => {
    jasmine.clock().install();
    
    service.show('info', 'First message');
    expect(service.state()?.message).toBe('First message');
    
    jasmine.clock().tick(2000); // 2 seconds
    
    service.show('success', 'Second message');
    expect(service.state()?.message).toBe('Second message');
    
    jasmine.clock().tick(4000); // 4 more seconds (6 total)
    // First timeout should have been cleared, so state should still be visible
    expect(service.state()?.message).toBe('Second message');
    
    jasmine.clock().tick(1000); // 1 more second (5 seconds from second show)
    // Now the second timeout should have fired
    expect(service.state()).toBeNull();
    
    jasmine.clock().uninstall();
  });
});

