import { Routes } from '@angular/router';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { TeamFormComponent } from './pages/team-form/team-form.component';

export const routes: Routes = [
  { path: 'list', component: TeamListComponent },
  { path: 'form', component: TeamFormComponent },
];
