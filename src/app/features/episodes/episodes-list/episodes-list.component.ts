import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  episodes: Episode[] = [];
  loading = true;
  page = 1;
  pageSize = 6;

  ngOnInit() {
    fetch('assets/episodes.json')
      .then(res => res.json())
      .then(data => {
        this.episodes = data.results || data;
        this.loading = false;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.episodes.length / this.pageSize);
  }

  get totalItems(): number {
    return this.episodes.length;
  }

  get labelPlural(): string {
    return 'episodios';
  }

  pageItems(): Episode[] {
    const start = (this.page - 1) * this.pageSize;
    return this.episodes.slice(start, start + this.pageSize);
  }

  prevPage() { if (this.page > 1) this.page--; }
  nextPage() { if (this.page < this.totalPages) this.page++; }
}
