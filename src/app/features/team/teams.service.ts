// src/app/features/teams/teams.service.ts
import { Injectable } from '@angular/core';

export interface Team {
  id: number;
  name: string;
  description: string;
  members: string[];
}

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teams: Team[] = [
    {
      id: 1,
      name: 'Council of Ricks',
      description: 'Organización formada por múltiples variantes de Rick.',
      members: ['Rick C-137', 'Rick Prime', 'Rick D716'],
    },
    {
      id: 2,
      name: 'Galactic Federation',
      description: 'Gobierno intergaláctico que controla múltiples planetas.',
      members: ['Federation Guard', 'Federation Officer'],
    },
  ];

  getTeams(): Team[] {
    return this.teams;
  }

  getTeam(id: number): Team | undefined {
    return this.teams.find((t) => t.id === id);
  }
}
