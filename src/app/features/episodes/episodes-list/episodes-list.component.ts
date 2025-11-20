import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EpisodesService, EpisodeAggregate } from '../episodes.service';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  loading = true;
  episodes = signal<EpisodeAggregate[]>([]);
  page = signal<number>(1);
  readonly PAGE_SIZE = 10;

  totalItems = computed(() => this.episodes().length);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.PAGE_SIZE)));
  pageItems = computed(() => {
    const start = (this.page() - 1) * this.PAGE_SIZE;
    return this.episodes().slice(start, start + this.PAGE_SIZE);
  });

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService.getAggregatedSeason1().subscribe({
      next: (data: EpisodeAggregate[]) => {
        this.episodes.set(data);
        this.loading = false;
      },
      error: (_err: unknown) => { this.loading = false; }
    });
  }

  onImgError(event: Event, type: 'episode' | 'character' | 'team' | 'location') {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    const fallback =
      type === 'episode'   ? 'assets/images/episodes/placeholder.png' :
      type === 'character' ? 'assets/images/characters/placeholder.png' :
      type === 'team'      ? 'assets/images/teams/placeholder.png' :
                             'assets/images/locations/placeholder.png';
    img.src = fallback;
  }
}
