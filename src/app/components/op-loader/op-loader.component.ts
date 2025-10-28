import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-op-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './op-loader.component.scss',
})
export class OpLoaderComponent {}

