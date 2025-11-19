// src/app/features/teams/pages/team-detail/team-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamsService, Team } from '../../teams.service';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  team?: Team;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    setTimeout(() => {
      this.team = this.teamsService.getTeam(id);
      this.loading = false;
    }, 500);
  }
}
