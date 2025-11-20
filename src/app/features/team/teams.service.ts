import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface TeamItem {
  id: number;
  name: string;
  description: string;
  created: string;
  members: string[];
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<{ results: TeamItem[] }> {
    return this.http.get<{ results: TeamItem[] }>('/assets/teams.json').pipe(
      map(data => ({ results: (data.results ?? []).sort((a,b) => a.id - b.id) }))
    );
  }

  getTeam(id: number): Observable<TeamItem | undefined> {
    return this.getAllTeams().pipe(map(d => d.results.find(t => t.id === id)));
  }
}
