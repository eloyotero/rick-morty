import { Routes } from '@angular/router';
import { EpisodesListComponent } from './features/episodes/pages/episodes-list/episodes-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full',
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import(
        './features/episodes/pages/episodes-list/episodes-list.component'
      ).then((m) => m.EpisodesListComponent),
  },
];
