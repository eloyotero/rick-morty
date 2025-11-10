import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<{ results: Episode[] }> {
    return this.http.get<{ results: Episode[] }>(this.apiUrl);
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }
}
