import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Team {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams = signal<Team[]>([]);
  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  ngOnInit() {
    fetch('assets/teams.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        this.teams.set(
          list.map((t: any, i: number) => ({
            id: i + 1,
            name: String(t.name ?? 'Sin nombre'),
            image: String(t.image ?? '')
          }))
        );
        this.totalPages = Math.ceil(this.teams().length / this.pageSize);
      })
      .catch(err => console.error('Error cargando equipos:', err));
  }

  filteredTeams(): Team[] {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.teams().filter(t =>
      t.name.toLowerCase().includes(term)
    );
    const start = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  imagePath(path: string): string {
    return path || 'assets/images/teams/placeholder.png';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/teams/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
}
