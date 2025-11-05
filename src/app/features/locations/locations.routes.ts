import { Routes } from '@angular/router';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';
import { LocationDetailComponent } from './pages/location-detail/location-detail.component';

export const routes: Routes = [
  { path: 'list', component: LocationsListComponent },
  { path: 'detail', component: LocationDetailComponent },
];
