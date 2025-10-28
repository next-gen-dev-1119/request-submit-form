import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RequestStateService } from '../../shared/state/request.service';
const shouldHasRequestInProgress = () => {
  const state = inject(RequestStateService);
  const router = inject(Router);
  if (state.isRequestInProgress()) {
    return true;
  }
  router.navigate(['request/start']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: '/request/start', pathMatch: 'full' },
  {
    path: 'start',
    loadComponent: () => import('./request-start/request-start.component').then((c) => c.RequestStartComponent)
  },
  {
    path: 'section/:schemaId/:sectionId',
    canActivate: [shouldHasRequestInProgress],
    loadComponent: () => import('./request-question/request-question.component').then((c) => c.RequestQuestionComponent)
  },
  {
    path: 'complete',
    canActivate: [shouldHasRequestInProgress],
    loadComponent: () => import('./request-complete/request-complete.component').then((c) => c.RequestCompleteComponent)
  }
];
