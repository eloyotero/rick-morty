import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface EpisodeDetail {
  id: number;
  title: string;
  code: string;
  image: string;
  characters: string[];
  locations: string[];
  teams: string[];
}

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {
  episode = signal<EpisodeDetail | null>(null);
  returnPage = signal(1);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.returnPage.set(Number(this.route.snapshot.queryParamMap.get('page') ?? 1));

    fetch('assets/episodes.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        const found = list[id - 1];

        if (found) {
          this.episode.set({
            id,
            title: String(found.title ?? 'Sin título'),
            code: String(found.code ?? ''),
            image: String(found.image ?? 'assets/images/episodes/placeholder.png'),
            characters: Array.isArray(found.characters) ? found.characters.map(String) : [],
            locations: Array.isArray(found.locations) ? found.locations.map(String) : [],
            teams: Array.isArray(found.teams) ? found.teams.map(String) : []
          });
        } else {
          this.episode.set(null);
        }
      })
      .catch(err => {
        console.error('Error cargando episodio:', err);
        this.episode.set(null);
      });
  }

  back() {
    this.router.navigate(['/episodes'], { queryParams: { page: this.returnPage() } });
  }

  imagePath(path: string) { return path; }
  onImageError(e: Event) {
    (e.target as HTMLImageElement).src = 'assets/images/episodes/placeholder.png';
  }
}
