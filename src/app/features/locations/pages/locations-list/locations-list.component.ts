import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LocationsService, LocationItem } from '../../locations.service';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  loading = true;

  locations = signal<LocationItem[]>([]);
  page = signal<number>(1);
  private readonly PAGE_SIZE = 10;

  totalItems = computed(() => this.locations().length);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.PAGE_SIZE)));
  pageItems = computed(() => {
    const start = (this.page() - 1) * this.PAGE_SIZE;
    return this.locations().slice(start, start + this.PAGE_SIZE);
  });

  constructor(
    private locationsService: LocationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const p = Number(params.get('page')) || 1;
      this.page.set(Math.max(1, Math.floor(p)));
    });

    this.locationsService.getAllLocations().subscribe({
      next: (data) => {
        this.locations.set(data.results ?? []);
        this.loading = false;
        if (this.page() > this.totalPages()) this.goToPage(this.totalPages());
      },
      error: () => this.loading = false
    });
  }

  goToPage(p: number) {
    const clamped = Math.min(this.totalPages(), Math.max(1, Math.floor(p)));
    this.page.set(clamped);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: clamped },
      queryParamsHandling: 'merge'
    });
  }

  nextPage() { this.goToPage(this.page() + 1); }
  prevPage() { this.goToPage(this.page() - 1); }

  trackById(_i: number, item: LocationItem) { return item.id; }

  // Maneja error de carga de imagen desde la plantilla
  onImageError(event: Event) {
    const img = event?.target as HTMLImageElement | null;
    if (img && img.src.indexOf('placeholder.png') === -1) {
      img.src = 'assets/images/locations/placeholder.png';
    }
  }
}
