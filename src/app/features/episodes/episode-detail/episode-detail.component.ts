import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode: any;
  characters: { id: number; name: string; image: string }[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http
      .get(`https://rickandmortyapi.com/api/episode/${id}`)
      .subscribe((value: unknown) => {
        const data = value as any;
        this.episode = data;

        const requests = data.characters.map((url: string) =>
          this.http.get(url)
        );
        forkJoin(requests).subscribe((value: unknown) => {
          const characters = value as any[];
          this.characters = characters.map((c) => ({
            id: c.id,
            name: c.name,
            image: c.image,
          }));
          this.loading = false;
        });
      });
  }
}
