import { Component, OnInit } from '@angular/core';
import { LocationsService, Location } from '../../locations.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  locations: Location[] = [];
  loading = true;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe({
      next: (response: { results: Location[] }) => {
        this.locations = response.results;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
