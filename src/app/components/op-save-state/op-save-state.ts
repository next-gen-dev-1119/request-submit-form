import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpSaveStateService } from './op-save-state.service';

@Component({
  selector: 'app-op-save-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(state()) {
      <div class="inline-flex items-center gap-2">
        @if(state()?.icon === 'loading') {
          <div class="spinner-small"></div>
        }
        @if(state()?.icon === 'error') {
          <span class="text-red-500 text-lg">⚠️</span>
        }
        <span 
          class="text-sm"
          [ngClass]="{
            'text-green-600': state()?.type === 'success',
            'text-red-500': state()?.type === 'error',
            'text-gray-600': state()?.type === 'info'
          }"
        >
          {{ state()?.message }}
        </span>
      </div>
    }
  `,
  styleUrl: './op-save-state.scss',
})
export class OpSaveStateComponent {
  private saveStateService = inject(OpSaveStateService);
  state = this.saveStateService.state;

  close() {
    this.saveStateService.clear();
  }
}
