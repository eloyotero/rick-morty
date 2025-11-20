import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface TeamDetail {
  id: number;
  name: string;
  image: string;
  members: string[];
  episodes: string[];
}

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team = signal<TeamDetail | null>(null);
  returnPage = signal(1);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.returnPage.set(Number(this.route.snapshot.queryParamMap.get('page') ?? 1));

    fetch('assets/teams.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        const found = list[id - 1];
        if (found) {
          this.team.set({
            id,
            name: String(found.name ?? 'Sin nombre'),
            image: String(found.image ?? ''),
            members: Array.isArray(found.members) ? found.members.map(String) : [],
            episodes: Array.isArray(found.episodes) ? found.episodes.map(String) : []
          });
        }
      })
      .catch(err => console.error('Error cargando equipo:', err));
  }

  back() {
    this.router.navigate(['/teams'], { queryParams: { page: this.returnPage() } });
  }

  imagePath(path: string): string {
    const p = String(path ?? '').trim();
    if (!p) return 'assets/images/teams/placeholder.png';
    const normalized = p.replace(/\\/g, '/').replace(/\s+/g, '%20');
    if (!/^assets\//.test(normalized)) {
      return `assets/images/teams/${normalized}`;
    }
    return normalized;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/teams/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
}
