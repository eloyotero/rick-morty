// src/app/features/teams/pages/teams-list/teams-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamsService, Team } from '../../teams.service';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = [];
  loading = true;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    // Simulamos carga con timeout
    setTimeout(() => {
      this.teams = this.teamsService.getTeams();
      this.loading = false;
    }, 500);
  }
}
