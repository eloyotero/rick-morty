// src/app/features/locations/pages/location-detail/location-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationsService, Location } from '../../locations.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
  location?: Location;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.locationsService.getLocation(id).subscribe({
      next: (l) => {
        this.location = l;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando localización', err);
        this.loading = false;
      },
    });
  }
}
