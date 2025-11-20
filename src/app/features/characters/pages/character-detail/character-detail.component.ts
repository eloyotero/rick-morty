import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface CharacterDetail {
  id: number;
  name: string;
  image: string;
  description: string;
  episodes: string[];
}

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character = signal<CharacterDetail | null>(null);
  returnPage = signal(1);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.returnPage.set(Number(this.route.snapshot.queryParamMap.get('page') ?? 1));

    fetch('assets/characters.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        const found = list[id - 1];
        if (found) {
          this.character.set({
            id,
            name: String(found.name ?? 'Sin nombre'),
            image: String(found.image ?? ''),
            description: String(found.description ?? ''),
            episodes: Array.isArray(found.episodes) ? found.episodes.map(String) : []
          });
        }
      })
      .catch(err => console.error('Error cargando personaje:', err));
  }

  back() {
    this.router.navigate(['/characters'], { queryParams: { page: this.returnPage() } });
  }

  imagePath(path: string): string {
    // Usa directamente lo que viene del JSON
    return path || 'assets/images/characters/placeholder.png';
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/characters/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
  
}
