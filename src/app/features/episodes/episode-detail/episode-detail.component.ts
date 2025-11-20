import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EpisodesService, EpisodeAggregate } from '../episodes.service'; // ajusta la ruta según tu estructura

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {
  loading = true;
  episode = signal<EpisodeAggregate | null>(null);

  constructor(
    private route: ActivatedRoute,
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    this.episodesService.getAggregatedSeason1().subscribe({
      next: (data: EpisodeAggregate[]) => {
        const found = data.find((e: EpisodeAggregate) => e.code === code) ?? null;
        this.episode.set(found);
        this.loading = false;
      },
      error: (_err: unknown) => {
        this.loading = false;
      }
    });
  }

  onImgError(event: Event, type: 'episode' | 'character' | 'team' | 'location') {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    const fallback =
      type === 'episode'
        ? 'assets/images/episodes/placeholder.png'
        : type === 'character'
        ? 'assets/images/characters/placeholder.png'
        : type === 'team'
        ? 'assets/images/teams/placeholder.png'
        : 'assets/images/locations/placeholder.png';
    img.src = fallback;
  }
}
