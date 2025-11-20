// src/app/features/characters/pages/characters-list/characters-list.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CharactersService, CharacterItem } from '../../characters.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  loading = true;

  characters = signal<CharacterItem[]>([]);
  page = signal<number>(1);
  private readonly PAGE_SIZE = 10;

  totalItems = computed(() => this.characters().length);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.PAGE_SIZE)));
  pageItems = computed(() => {
    const start = (this.page() - 1) * this.PAGE_SIZE;
    return this.characters().slice(start, start + this.PAGE_SIZE);
  });

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const p = Number(params.get('page')) || 1;
      this.page.set(Math.max(1, Math.floor(p)));
    });

    this.charactersService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data.results ?? []);
        this.loading = false;
        if (this.page() > this.totalPages()) this.goToPage(this.totalPages());
      },
      error: () => this.loading = false
    });
  }

  goToPage(p: number) {
    const clamped = Math.min(this.totalPages(), Math.max(1, Math.floor(p)));
    this.page.set(clamped);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: clamped },
      queryParamsHandling: 'merge'
    });
  }

  nextPage() { this.goToPage(this.page() + 1); }
  prevPage() { this.goToPage(this.page() - 1); }

  trackById(_i: number, item: CharacterItem) { return item.id; }
}
