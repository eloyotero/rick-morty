import { Routes } from '@angular/router';


import { CharactersListComponent } from './features/characters/pages/characters-list/characters-list.component';
import { CharacterDetailComponent } from './features/characters/pages/character-detail/character-detail.component';


import { LocationsListComponent } from './features/locations/pages/locations-list/locations-list.component';
import { LocationDetailComponent } from './features/locations/pages/location-detail/location-detail.component';


import { TeamsListComponent } from './features/team/pages/team-list/team-list.component';
import { TeamDetailComponent } from './features/team/pages/team-detail/team-detail.component';


import { EpisodesListComponent } from './features/episodes/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './features/episodes/episode-detail/episode-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'episodes', pathMatch: 'full' },

 
  { path: 'characters', component: CharactersListComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },

 
  { path: 'locations', component: LocationsListComponent },
  { path: 'locations/:id', component: LocationDetailComponent },

  
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/:id', component: TeamDetailComponent },

  
  { path: 'episodes', component: EpisodesListComponent },
  { path: 'episodes/:code', component: EpisodeDetailComponent },


  { path: '**', redirectTo: 'episodes' }
];
