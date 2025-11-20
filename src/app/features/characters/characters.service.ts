
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface CharacterItem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image?: string;
  episode: string[];
}

const ALLOWED = new Set(['S01E01','S01E02','S01E03','S01E04','S01E05','S01E06','S01E07','S01E08','S01E09','S01E10','S01E11']);

@Injectable({ providedIn: 'root' })
export class CharactersService {
  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<{ results: CharacterItem[] }> {
    return this.http.get<{ results: CharacterItem[] }>('/assets/characters.json').pipe(
      map(data => ({
       
        results: (data.results ?? []).filter(ch => ch.episode?.some(ep => ALLOWED.has(ep))).sort((a, b) => a.id - b.id)
      }))
    );
  }

  getCharacter(id: number): Observable<CharacterItem | undefined> {
    return this.getAllCharacters().pipe(map(d => d.results.find(c => c.id === id)));
  }
}
