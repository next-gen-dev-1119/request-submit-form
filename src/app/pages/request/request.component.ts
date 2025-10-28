import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestComponent { }
