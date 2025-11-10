import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';
import { LocationDetailComponent } from './pages/location-detail/location-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LocationsListComponent, LocationDetailComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class LocationsModule {}
