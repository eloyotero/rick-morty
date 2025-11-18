// src/app/features/locations/pages/locations-list/locations-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocationsService, Location } from '../../locations.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  locations: Location[] = [];
  loading = true;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe({
      next: (data) => {
        this.locations = data.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando localizaciones', err);
        this.loading = false;
      },
    });
  }
}
