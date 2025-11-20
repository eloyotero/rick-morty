// src/app/features/episodes/pages/episodes-list/episodes-list.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Episode {
  id: number;
  title: string;
  code: string; // e.g., S01E10
  image: string;
}

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  episodes = signal<Episode[]>([]);
  loading = signal(true);
  page = signal(1);
  pageSize = 12;
  searchTerm = signal('');

  // Sort by season and episode number extracted from "SxxExx"
  private sortByCode(a: Episode, b: Episode) {
    const parse = (code: string) => {
      const m = code.match(/^S(\d{2})E(\d{2})$/i);
      return m ? { s: Number(m[1]), e: Number(m[2]) } : { s: 0, e: 0 };
    };
    const A = parse(a.code), B = parse(b.code);
    return A.s === B.s ? A.e - B.e : A.s - B.s;
  }

  totalPages = computed(() =>
    Math.ceil(this.filteredEpisodes().length / this.pageSize)
  );

  filteredEpisodes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const base = this.episodes().slice().sort(this.sortByCode.bind(this));
    if (!term) return base;
    return base.filter(e =>
      e.title.toLowerCase().includes(term) || e.code.toLowerCase().includes(term)
    );
  });

  pageItems = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredEpisodes().slice(start, start + this.pageSize);
  });

  ngOnInit() {
    fetch('assets/episodes.json')
      .then(res => res.json())
      .then(data => {
        const raw = Array.isArray(data) ? data : data.results || [];
        const list: Episode[] = raw.map((ep: any, index: number) => ({
          id: index + 1,
          title: String(ep.title ?? 'Sin título'),
          code: String(ep.code ?? ''),
          image: String(ep.image ?? 'assets/images/episodes/placeholder.png')
        }));
        this.episodes.set(list);
      })
      .catch(err => {
        console.error('Error cargando episodios:', err);
        this.episodes.set([]);
      })
      .finally(() => this.loading.set(false));
  }

  imagePath(path: string): string { return path; }
  onImageError(event: Event) { (event.target as HTMLImageElement).src = 'assets/images/episodes/placeholder.png'; }
  prevPage() { if (this.page() > 1) this.page.set(this.page() - 1); }
  nextPage() { if (this.page() < this.totalPages()) this.page.set(this.page() + 1); }
  trackById(index: number, item: Episode) { return item.id; }
}
