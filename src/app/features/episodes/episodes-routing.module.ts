import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './pages/episode-detail/episode-detail.component';

const routes: Routes = [
  { path: '', component: EpisodesListComponent },
  { path: ':id', component: EpisodeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodesRoutingModule {}
