// src/app/features/locations/locations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(page = 1): Observable<{ results: Location[] }> {
    return this.http.get<{ results: Location[] }>(
      `${this.apiUrl}?page=${page}`
    );
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }
}
