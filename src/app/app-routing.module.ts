import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'episodes', pathMatch: 'full' },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./features/episodes/episodes.module').then(
        (m) => m.EpisodesModule
      ),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./features/characters/characters.module').then(
        (m) => m.CharactersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
