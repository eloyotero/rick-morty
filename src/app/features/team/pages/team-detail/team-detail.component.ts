import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Team {
  id: number;
  name: string;
  description?: string;
  members?: string[];
  image: string;
  created?: string;
}

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team: Team | null = null;
  returnPage = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.returnPage = +(this.route.snapshot.queryParamMap.get('page') || 1);

    this.http.get<any>('assets/teams.json').subscribe(res => {
      const list = res.results || res;
      this.team = list.find((t: any) => t.id === id) || null;
    });
  }

  back() {
    this.router.navigate(['/teams'], { queryParams: { page: this.returnPage } });
  }

  imagePath(filename: string): string {
    return filename.startsWith('assets/') ? filename : 'assets/images/teams/' + filename;
  }

  onImageError(e: Event) {
    (e.target as HTMLImageElement).src = 'assets/images/teams/placeholder.png';
  }
}
