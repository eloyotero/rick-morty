import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocationsService, Location } from '../../locations.service';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      error: () => (this.loading = false),
    });
  }
}
