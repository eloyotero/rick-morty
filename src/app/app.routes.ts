// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },

  // Characters
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

  // Episodes
  // src/app/app.routes.ts
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/episodes-list/episodes-list.component').then(
        (m) => m.EpisodesListComponent
      ),
  },
  {
    path: 'episodes/:id',
    loadComponent: () =>
      import(
        './features/episodes/episode-detail/episode-detail.component'
      ).then((m) => m.EpisodeDetailComponent),
  },

  // Locations
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

  // Teams (ojo: carpeta es singular "team")
  {
    path: 'teams',
    loadComponent: () =>
      import('./features/team/pages/team-list/team-list.component').then(
        (m) => m.TeamsListComponent
      ),
  },
  {
    path: 'teams/:id',
    loadComponent: () =>
      import('./features/team/pages/team-detail/team-detail.component').then(
        (m) => m.TeamDetailComponent
      ),
  },

  { path: '**', redirectTo: 'characters' },
];
