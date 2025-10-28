import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="question-container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './question-container.component.scss',
})
export class QuestionContainerComponent {}

