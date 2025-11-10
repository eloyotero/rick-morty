import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<{ results: Location[] }> {
    return this.http.get<{ results: Location[] }>(this.apiUrl);
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }
}
