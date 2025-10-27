import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () =>
      import(
        './features/characters/pages/characters-list/characters.module'
      ).then((m) => m.CharactersModule),
  },
  { path: '**', redirectTo: 'characters' },
];
