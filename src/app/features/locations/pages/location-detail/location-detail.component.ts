import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationsService, LocationItem } from '../../locations.service';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  location: LocationItem | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private locationsService: LocationsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.locationsService.getLocation(id).subscribe({
      next: (data) => { this.location = data ?? null; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  // Maneja error de carga de imagen desde la plantilla
  onImageError(event: Event) {
    const img = event?.target as HTMLImageElement | null;
    if (img && img.src.indexOf('placeholder.png') === -1) {
      img.src = 'assets/images/locations/placeholder.png';
    }
  }
}
