// src/app/features/episodes/pages/episodes-list/episodes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EpisodesService, Episode } from '../episodes.service';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent implements OnInit {
  episodes: Episode[] = [];
  loading = true;

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = data.results;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
