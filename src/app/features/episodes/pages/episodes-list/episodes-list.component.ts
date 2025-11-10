import { Component, OnInit } from '@angular/core';
import { EpisodesService, Episode } from '../../episodes.service';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent implements OnInit {
  episodes: Episode[] = [];
  loading: boolean = true;

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe({
      next: (response: { results: Episode[] }) => {
        this.episodes = response.results;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
