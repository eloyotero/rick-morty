// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import(
        './features/characters/pages/characters-list/characters-list.component'
      ).then((m) => m.CharactersListComponent),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import(
        './features/characters/pages/character-detail/character-detail.component'
      ).then((m) => m.CharacterDetailComponent),
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/episodes-list/episodes-list.component').then(
        (m) => m.EpisodesListComponent
      ),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import(
        './features/locations/pages/locations-list/locations-list.component'
      ).then((m) => m.LocationsListComponent),
  },
  {
    path: 'locations/:id',
    loadComponent: () =>
      import(
        './features/locations/pages/location-detail/location-detail.component'
      ).then((m) => m.LocationDetailComponent),
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
