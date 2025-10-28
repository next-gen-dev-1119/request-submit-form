import { Routes } from '@angular/router';
import { RequestComponent } from './pages/request/request.component';

export const routes: Routes = [
  { path: '', redirectTo: '/request', pathMatch: 'full' },
  {
    path: 'request',
    component: RequestComponent,
    loadChildren: () => import('./pages/request/request.routes').then((m) => m.routes),
  },
];
