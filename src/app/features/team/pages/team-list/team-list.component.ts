import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Team {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = [];
  loading = true;
  page = 1;
  pageSize = 6;

  ngOnInit() {
    fetch('assets/teams.json')
      .then(res => res.json())
      .then(data => {
        this.teams = data.results || data;
        this.loading = false;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.teams.length / this.pageSize);
  }

  pageItems(): Team[] {
    const start = (this.page - 1) * this.pageSize;
    return this.teams.slice(start, start + this.pageSize);
  }

  prevPage() { if (this.page > 1) this.page--; }
  nextPage() { if (this.page < this.totalPages) this.page++; }

  imagePath(filename: string): string {
    return filename.startsWith('assets/') ? filename : 'assets/images/teams/' + filename;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/teams/placeholder.png';
  }
}
