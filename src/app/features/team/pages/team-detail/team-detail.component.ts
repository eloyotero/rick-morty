import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeamsService, TeamItem } from '../../teams.service';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team: TeamItem | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private teamsService: TeamsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teamsService.getTeam(id).subscribe({
      next: (data) => { this.team = data ?? null; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  onImageError(event: Event) {
    const img = event?.target as HTMLImageElement | null;
    if (img && img.src.indexOf('placeholder.png') === -1) {
      img.src = 'assets/images/teams/placeholder.png';
    }
  }
}
