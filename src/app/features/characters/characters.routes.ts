import { Routes } from '@angular/router';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

export const routes: Routes = [
  { path: 'list', component: CharactersListComponent },
  { path: 'detail', component: CharacterDetailComponent },
];
