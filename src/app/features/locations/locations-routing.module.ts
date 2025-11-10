import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';
import { LocationDetailComponent } from './pages/location-detail/location-detail.component';

const routes: Routes = [
  { path: '', component: LocationsListComponent },
  { path: ':id', component: LocationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
