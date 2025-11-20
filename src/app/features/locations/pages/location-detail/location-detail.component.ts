import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface LocationDetail {
  id: number;
  name: string;
  image: string;
  description: string;
  episodes: string[];
}

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  location = signal<LocationDetail | null>(null);
  returnPage = signal(1);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.returnPage.set(Number(this.route.snapshot.queryParamMap.get('page') ?? 1));

    fetch('assets/locations.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        const found = list[id - 1];
        if (found) {
          this.location.set({
            id,
            name: String(found.name ?? 'Sin nombre'),
            image: String(found.image ?? ''),
            description: String(found.description ?? ''),
            episodes: Array.isArray(found.episodes) ? found.episodes.map(String) : []
          });
        }
      })
      .catch(err => console.error('Error cargando localización:', err));
  }

  back() {
    this.router.navigate(['/locations'], { queryParams: { page: this.returnPage() } });
  }

  
  imagePath(path: string): string {
    return path || 'assets/images/locations/placeholder.png';
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/locations/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
  
  
}
