import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent implements OnInit {
  episodes: {
    id: number;
    name: string;
    episode: string;
    air_date: string;
    characters: { id: number; name: string; image: string }[];
  }[] = [];

  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 1. Obtener listado de episodios
    this.http
      .get<any>('https://rickandmortyapi.com/api/episode')
      .subscribe((episodeList) => {
        if (!episodeList?.results) return;

        // 2. Peticiones para cada episodio
        const episodeRequests: Observable<any>[] = episodeList.results.map(
          (ep: any) => this.http.get<any>(ep.url)
        );

        forkJoin(episodeRequests).subscribe((episodesData: any[]) => {
          // 3. Para cada episodio, obtener hasta 5 personajes
          const characterFetches: Observable<any>[] = episodesData.map((ep) => {
            const requests: Observable<any>[] = ep.characters
              .slice(0, 5)
              .map((url: string) => this.http.get<any>(url));
            return forkJoin(requests).pipe(
              map((chars: any[]) => ({
                id: ep.id,
                name: ep.name,
                episode: ep.episode,
                air_date: ep.air_date,
                characters: chars.map((c) => ({
                  id: c.id,
                  name: c.name,
                  image: c.image,
                })),
              }))
            );
          });

          // 4. Ejecutar todas las peticiones de personajes
          forkJoin(characterFetches).subscribe((finalEpisodes: any[]) => {
            this.episodes = finalEpisodes;
            this.loading = false;
          });
        });
      });
  }
}
