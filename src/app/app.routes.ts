import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'episodes', pathMatch: 'full' },

  { path: 'characters', loadComponent: () =>
      import('./features/characters/pages/characters-list/characters-list.component')
      .then(m => m.CharactersListComponent) },
  { path: 'characters/:id', loadComponent: () =>
      import('./features/characters/pages/character-detail/character-detail.component')
      .then(m => m.CharacterDetailComponent) },

  { path: 'episodes', loadComponent: () =>
      import('./features/episodes/episodes-list/episodes-list.component')
      .then(m => m.EpisodesListComponent) },
  { path: 'episodes/:id', loadComponent: () =>
      import('./features/episodes/episode-detail/episode-detail.component')
      .then(m => m.EpisodeDetailComponent) },

  { path: 'locations', loadComponent: () =>
      import('./features/locations/pages/locations-list/locations-list.component')
      .then(m => m.LocationsListComponent) },
  { path: 'locations/:id', loadComponent: () =>
      import('./features/locations/pages/location-detail/location-detail.component')
      .then(m => m.LocationDetailComponent) },

  { path: 'teams', loadComponent: () =>
      import('./features/team/pages/team-list/team-list.component')
      .then(m => m.TeamListComponent) },
  { path: 'teams/:id', loadComponent: () =>
      import('./features/team/pages/team-detail/team-detail.component')
      .then(m => m.TeamDetailComponent) },
];
