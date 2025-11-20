// src/app/features/locations/locations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface LocationItem {
  id: number;
  name: string;
  type: string;
  dimension: string;
  episode?: string;
  residents: string[];
  image?: string; // imagen opcional
}

@Injectable({ providedIn: 'root' })
export class LocationsService {
  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<{ results: LocationItem[] }> {
    return this.http.get<{ results: LocationItem[] }>('/assets/locations.json').pipe(
      map(data => ({
        results: (data.results ?? []).sort((a, b) => a.id - b.id)
      }))
    );
  }

  getLocation(id: number): Observable<LocationItem | undefined> {
    return this.getAllLocations().pipe(map(d => d.results.find(l => l.id === id)));
  }
}
