import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class CharactersModule {}
