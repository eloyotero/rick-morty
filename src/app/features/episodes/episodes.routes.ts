import { Routes } from '@angular/router';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './pages/episode-detail/episode-detail.component';

export const routes: Routes = [
  { path: 'list', component: EpisodesListComponent },
  { path: 'detail', component: EpisodeDetailComponent },
];
