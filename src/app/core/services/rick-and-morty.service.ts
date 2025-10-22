import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/character`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/character/${id}`);
  }

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/episode`);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/location`);
  }
}
