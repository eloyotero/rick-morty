import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full',
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/episodes-list/episodes-list.component')
        .then((m) => m.EpisodesListComponent),
  },
];
