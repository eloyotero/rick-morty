// src/app/features/episodes/pages/episodes-list/episodes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  imports: [],
})
export class EpisodesListComponent implements OnInit {
  episodes: Episode[] = [];
  loading = true;

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService.getAllEpisodes().subscribe({
      next: (data) => {
        this.episodes = data.results;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
