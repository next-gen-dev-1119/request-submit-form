import { Injectable, signal } from '@angular/core';

export type OpSaveStateType = 'success' | 'error' | 'info' | 'warning';
export type OpSaveStateIconType = 'loading' | 'error' | 'none';

export interface OpSaveStateConfig {
  type: OpSaveStateType;
  message: string;
  icon: OpSaveStateIconType;
}

@Injectable({ providedIn: 'root' })
export class OpSaveStateService {
  state = signal<OpSaveStateConfig | null>(null);
  private timeoutId: any = null;

  show(type: OpSaveStateType, message: string) {
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Determine icon based on message
    let icon: OpSaveStateIconType = 'none';
    if (message === 'Saving...' || message === 'Retrying...') {
      icon = 'loading';
    } else if (type === 'error') {
      icon = 'error';
    }

    this.state.set({ type, message, icon });

    // Auto-hide after 3 seconds only for success/error, not for loading states
    if (message !== 'Saving...' && message !== 'Retrying...') {
      this.timeoutId = setTimeout(() => {
        this.clear();
        this.timeoutId = null;
      }, 3000);
    }
  }

  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.state.set(null);
  }
}
