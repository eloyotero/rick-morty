import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodesService, Episode } from '../../episodes.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode!: Episode;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.episodesService.getEpisodeById(id).subscribe({
      next: (data: Episode) => {
        this.episode = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
