import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

// Personajes
export interface CharacterItem {
  id: number;
  name: string;
  status: string;     // vivo, muerto, desconocido
  species: string;    // humano, alien, etc.
  type: string;       // subtipo si aplica
  gender: string;     // masculino, femenino, desconocido
  origin: string;     // planeta de origen
  location: string;   // ubicación actual
  image?: string;
  episode: string[];  // lista de códigos de episodios donde aparece
}

// Localizaciones
export interface LocationItem {
  id: number;
  name: string;
  type: string;        // planeta, dimensión, ciudad, etc.
  dimension: string;   // dimensión a la que pertenece
  episode?: string;    // episodio en el que aparece
  residents: string[]; // nombres de residentes
  image?: string;
}

// Equipos
export interface TeamItem {
  id: number;
  name: string;
  description: string; // descripción del equipo
  created: string;     // fecha de creación
  members: string[];   // nombres de miembros
  image?: string;
  episode?: string[];  // episodios en los que aparece
}

// Episodios base
export interface EpisodeBase {
  code: string;        // S01E01
  title: string;       // título del episodio
  date: string;        // fecha de emisión
  image?: string;      // miniatura
}

// Episodio agregado con personajes, equipos y localizaciones
export interface EpisodeAggregate extends EpisodeBase {
  characters: CharacterItem[];
  locations: LocationItem[];
  teams: TeamItem[];
}

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  constructor(private http: HttpClient) {}

  // Cargar episodios base desde assets/episodes.json
  getBaseEpisodes(): Observable<EpisodeBase[]> {
    return this.http.get<{ results: EpisodeBase[] }>('/assets/episodes.json')
      .pipe(map(d => d.results ?? []));
  }

  // Cargar temporada 1 con personajes, equipos y localizaciones agregados
  getAggregatedSeason1(): Observable<EpisodeAggregate[]> {
    const characters$ = this.http.get<{ results: CharacterItem[] }>('/assets/characters.json');
    const locations$  = this.http.get<{ results: LocationItem[] }>('/assets/locations.json');
    const teams$      = this.http.get<{ results: TeamItem[] }>('/assets/teams.json');
    const base$       = this.getBaseEpisodes();

    return forkJoin([characters$, locations$, teams$, base$]).pipe(
      map(([cData, lData, tData, base]) => {
        const chars = cData.results ?? [];
        const locs  = lData.results ?? [];
        const teams = tData.results ?? [];

        return base.map(ep => ({
          ...ep,
          characters: chars.filter(ch => ch.episode.includes(ep.code)),
          locations: locs.filter(loc => loc.episode === ep.code),
          teams: teams.filter(team =>
            team.episode?.includes(ep.code) ||
            team.members.some(m =>
              chars.filter(ch => ch.episode.includes(ep.code)).map(c => c.name).includes(m)
            )
          )
        }));
      })
    );
  }
}
