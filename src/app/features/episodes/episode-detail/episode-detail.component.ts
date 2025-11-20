import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters?: string[];
}

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode | null = null;
  returnPage = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.returnPage = +(this.route.snapshot.queryParamMap.get('page') || 1);

    this.http.get<any>('assets/episodes.json').subscribe(res => {
      const list = res.results || res;
      this.episode = list.find((e: any) => e.id === id) || null;
    });
  }

  back() {
    this.router.navigate(['/episodes'], { queryParams: { page: this.returnPage } });
  }
}
