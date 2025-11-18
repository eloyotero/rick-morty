// src/app/features/characters/characters.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
}

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page = 1): Observable<{ results: Character[] }> {
    return this.http.get<{ results: Character[] }>(
      `${this.apiUrl}?page=${page}`
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
