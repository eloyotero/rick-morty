// src/app/features/episodes/pages/episode-detail/episode-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EpisodesService, Episode } from '../episodes.service';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode?: Episode;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.episodesService.getEpisode(id).subscribe({
      next: (e) => {
        this.episode = e;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
