import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'team',
    loadChildren: () =>
      import('./features/team/team.routes').then((m) => m.routes),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./features/locations/locations.routes').then((m) => m.routes),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./features/episodes/episodes.routes').then((m) => m.routes),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./features/characters/characters.routes').then((m) => m.routes),
  },
];
