import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

export interface CharacterItem {
  id: number;
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
  location?: string;
  episode?: string[] | string;
  image?: string;
}

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  template: `
<section class="locations-like-page">
  <header class="section-header">
    <h2>Personajes</h2>

    <div class="pager" *ngIf="totalPages > 1">
      <button class="btn" (click)="prevPage()" [disabled]="page === 1">Anterior</button>

      <nav class="pages" aria-label="Páginas">
        <button
          class="page-btn"
          *ngFor="let p of pagesArray"
          [class.active]="p === page"
          (click)="goToPage(p)"
        >{{ p }}</button>
      </nav>

      <button class="btn" (click)="nextPage()" [disabled]="page === totalPages">Siguiente</button>
    </div>
  </header>

  <div *ngIf="loading" class="loader">Cargando personajes…</div>

  <div class="cards-grid" *ngIf="!loading && characters.length > 0">
    <article class="location-card" *ngFor="let ch of pageItems(); trackBy: trackById">
      <div class="thumb">
        <a [routerLink]="['/characters', ch.id]">
          <img [src]="imagePath(ch.image)" [alt]="ch.name" (error)="onImageError($event)" />
        </a>
      </div>

      <div class="content">
        <h3 class="title">
          <a [routerLink]="['/characters', ch.id]">{{ ch.name }}</a>
        </h3>

        <p class="muted">
          <strong>Estado:</strong> {{ ch.status || 'Unknown' }}
        </p>
        <p class="muted">
          <strong>Especie:</strong> {{ ch.species || 'Unknown' }}
        </p>
        <p class="muted small">
          <strong>Origen:</strong> {{ ch.origin || 'Unknown' }}
          <span class="sep">•</span>
          <strong>Episodios:</strong> {{ episodeCount(ch) }}
        </p>

        <div class="actions">
          <a class="btn-detail" [routerLink]="['/characters', ch.id]">Ver detalle</a>
        </div>
      </div>
    </article>
  </div>

  <div *ngIf="!loading && characters.length === 0" class="no-data">No hay personajes cargados.</div>

  <footer class="footer-pager" *ngIf="!loading && totalPages > 1">
    <button class="btn" (click)="prevPage()" [disabled]="page === 1">Anterior</button>
    <span class="page-info">Página {{ page }} de {{ totalPages }} ({{ totalItems }} personajes)</span>
    <button class="btn" (click)="nextPage()" [disabled]="page === totalPages">Siguiente</button>
  </footer>
</section>
  `,
  styles: [`
:host { display:block; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#e6eef6; }
.locations-like-page { padding:18px; background:#07070a; min-height:100vh; }
.section-header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
.section-header h2 { margin:0; font-size:1.25rem; color:#fff; }

/* pager */
.pager { display:flex; align-items:center; gap:10px; }
.pages { display:flex; gap:6px; }
.page-btn { background:transparent; color:#bfcfe6; border:1px solid rgba(255,255,255,0.04); padding:6px 10px; border-radius:8px; cursor:pointer; }
.page-btn.active { background:#1f50d8; color:#fff; border-color:transparent; box-shadow:0 6px 18px rgba(31,80,216,0.18); }

/* grid like locations */
.cards-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:16px; }

/* location-like card */
.location-card {
  display:flex;
  gap:12px;
  align-items:flex-start;
  background:linear-gradient(180deg,#06070a 0%,#0b0d10 100%);
  border-radius:10px;
  padding:10px;
  border:1px solid rgba(255,255,255,0.04);
  box-shadow:0 6px 18px rgba(2,6,23,0.55);
  min-height:120px;
}

.thumb { width:120px; height:120px; flex:0 0 120px; border-radius:8px; overflow:hidden; background:#0a0a0c; display:flex; align-items:center; justify-content:center; }
.thumb img { width:100%; height:100%; object-fit:cover; display:block; }

.content { flex:1 1 auto; display:flex; flex-direction:column; gap:6px; }
.title { margin:0; font-size:1.05rem; color:#fff; }
.title a { color:inherit; text-decoration:none; }

.muted { margin:0; color:#b9c6d8; font-size:0.9rem; }
.small { font-size:0.82rem; color:#99accb; }

.sep { margin: 0 8px; color: rgba(191,207,230,0.5); }

/* actions */
.actions { margin-top:auto; display:flex; gap:8px; }
.btn-detail { display:inline-block; background:linear-gradient(180deg,#2b6ef6,#1f50d8); color:#fff; padding:8px 12px; border-radius:8px; text-decoration:none; font-weight:600; }

/* footer pager */
.footer-pager { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:18px; color:#bfcfe6; }
.btn { background:transparent; color:#bfcfe6; border:1px solid rgba(255,255,255,0.04); padding:6px 10px; border-radius:6px; cursor:pointer; }
.btn[disabled] { opacity:0.45; cursor:not-allowed; }

.loader { color:#bfcfe6; }
.no-data { color:#ff6b6b; margin-top:12px; text-align:center; }
  `]
})
export class CharactersListComponent implements OnInit {
  characters: CharacterItem[] = [];
  loading = true;

  page = 1;
  readonly pageSize = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void { this.loadCharacters(); }

  private loadCharacters(): void {
    this.loading = true;
    this.http.get<any>('/assets/characters.json').subscribe({
      next: res => {
        const arr = res?.results ?? res;
        this.characters = Array.isArray(arr) ? arr : [];
        this.loading = false;
        if (this.page > this.totalPages) this.page = this.totalPages || 1;
      },
      error: () => {
        this.characters = [];
        this.loading = false;
      }
    });
  }

  // pagination helpers
  get totalItems(): number { return this.characters.length; }
  get totalPages(): number { return Math.ceil(this.totalItems / this.pageSize); }
  get pagesArray(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  pageItems(): CharacterItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.characters.slice(start, start + this.pageSize);
  }
  prevPage(): void { if (this.page > 1) this.page--; }
  nextPage(): void { if (this.page < this.totalPages) this.page++; }
  goToPage(p: number): void { if (p >= 1 && p <= this.totalPages) this.page = p; }

  // utils
  imagePath(filename?: string): string {
    return '/assets/images/characters/' + ((filename || 'placeholder.png').trim());
  }
  onImageError(e: Event): void {
    const img = e.target as HTMLImageElement;
    img.onerror = null;
    img.src = '/assets/images/characters/placeholder.png';
  }
  trackById(_: number, it: CharacterItem): number { return it.id; }
  episodeCount(ch: CharacterItem): number { if (!ch?.episode) return 0; return Array.isArray(ch.episode) ? ch.episode.length : 1; }
  goToDetail(id: number): void { this.router.navigate(['/characters', id]).catch(() => {}); }
}
