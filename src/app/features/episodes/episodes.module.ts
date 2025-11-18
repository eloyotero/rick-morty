import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EpisodesListComponent } from './episodes-list/episodes-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EpisodesListComponent,
    RouterModule.forChild([
      {
        path: '',
        component: EpisodesListComponent,
      },
    ]),
  ],
})
export class EpisodesModule {}
