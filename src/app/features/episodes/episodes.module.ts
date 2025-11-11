import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesListComponent } from './episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EpisodesListComponent, EpisodeDetailComponent],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class EpisodesModule {}
