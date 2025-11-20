import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

export interface LocationItem {
  id: number;
  name: string;
  type?: string;
  dimension?: string;
  episode?: string[] | string;
  residents?: string[] | number;
  image?: string;
  description?: string;
}

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  template: `
<section class="locations-page">
  <header class="section-header">
    <h2>Localizaciones</h2>

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

  <div *ngIf="loading" class="loader">Cargando localizaciones…</div>

  <div class="cards-grid" *ngIf="!loading && locations.length > 0">
    <article class="location-card" *ngFor="let loc of pageItems(); trackBy: trackById">
      <div class="thumb">
        <a [routerLink]="['/locations', loc.id]" [queryParams]="{ page: page }">
          <img [src]="imagePath(loc.image || loc.name)" [alt]="loc.name" (error)="onImageError($event)" />
        </a>
      </div>

      <div class="content">
        <h3 class="title">
          <a [routerLink]="['/locations', loc.id]" [queryParams]="{ page: page }">{{ loc.name }}</a>
        </h3>

        <div class="actions">
          <a class="btn-detail" [routerLink]="['/locations', loc.id]" [queryParams]="{ page: page }">Ver detalle</a>
        </div>
      </div>
    </article>
  </div>

  <div *ngIf="!loading && locations.length === 0" class="no-data">No hay localizaciones cargadas.</div>

  <footer class="footer-pager" *ngIf="!loading && totalPages > 1">
    <button class="btn" (click)="prevPage()" [disabled]="page === 1">Anterior</button>
    <span class="page-info">Página {{ page }} de {{ totalPages }} ({{ totalItems }} localizaciones)</span>
    <button class="btn" (click)="nextPage()" [disabled]="page === totalPages">Siguiente</button>
  </footer>
</section>
  `,
  styles: [`
:host { display:block; font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#e6eef6; }
.locations-page { padding:18px; background:#07070a; min-height:100vh; }
.section-header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
.section-header h2 { margin:0; font-size:1.25rem; color:#fff; }
.pager { display:flex; align-items:center; gap:10px; }
.pages { display:flex; gap:6px; }
.page-btn { background:transparent; color:#bfcfe6; border:1px solid rgba(255,255,255,0.04); padding:6px 10px; border-radius:8px; cursor:pointer; }
.page-btn.active { background:#1f50d8; color:#fff; border-color:transparent; box-shadow:0 6px 18px rgba(31,80,216,0.18); }
.cards-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:16px; }
.location-card { display:flex; gap:12px; align-items:flex-start; background:linear-gradient(180deg,#06070a 0%,#0b0d10 100%); border-radius:10px; padding:10px; border:1px solid rgba(255,255,255,0.04); box-shadow:0 6px 18px rgba(2,6,23,0.55); min-height:120px; }
.thumb { width:120px; height:120px; flex:0 0 120px; border-radius:8px; overflow:hidden; background:#0a0a0c; display:flex; align-items:center; justify-content:center; }
.thumb img { width:100%; height:100%; object-fit:cover; display:block; }
.content { flex:1 1 auto; display:flex; flex-direction:column; gap:6px; }
.title { margin:0; font-size:1.05rem; color:#fff; }
.title a { color:inherit; text-decoration:none; }
.actions { margin-top:auto; display:flex; gap:8px; }
.btn-detail { display:inline-block; background:linear-gradient(180deg,#2b6ef6,#1f50d8); color:#fff; padding:8px 12px; border-radius:8px; text-decoration:none; font-weight:600; }
.footer-pager { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:18px; color:#bfcfe6; }
.btn { background:transparent; color:#bfcfe6; border:1px solid rgba(255,255,255,0.04); padding:6px 10px; border-radius:6px; cursor:pointer; }
.btn[disabled] { opacity:0.45; cursor:not-allowed; }
.loader { color:#bfcfe6; }
.no-data { color:#ff6b6b; margin-top:12px; text-align:center; }
  `]
})
export class LocationsListComponent implements OnInit {
  locations: LocationItem[] = [];
  loading = true;

  // pagination
  page = 1;
  readonly pageSize = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // read page from query param if present
    const qp = new URLSearchParams(window.location.search).get('page');
    this.page = qp ? Math.max(1, Number(qp)) : 1;
    this.loadLocations();
  }

  private loadLocations(): void {
    this.loading = true;
    this.http.get<any>('/assets/locations.json').subscribe({
      next: res => {
        const arr = res?.results ?? res;
        this.locations = Array.isArray(arr) ? arr : [];
        this.loading = false;
        if (this.page > this.totalPages) this.page = this.totalPages || 1;
      },
      error: () => {
        this.locations = [];
        this.loading = false;
      }
    });
  }

  // pagination helpers
  get totalItems(): number { return this.locations.length; }
  get totalPages(): number { return Math.ceil(this.totalItems / this.pageSize); }
  get pagesArray(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  pageItems(): LocationItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.locations.slice(start, start + this.pageSize);
  }
  prevPage(): void { if (this.page > 1) this.navigateToPage(this.page - 1); }
  nextPage(): void { if (this.page < this.totalPages) this.navigateToPage(this.page + 1); }
  goToPage(p: number): void { if (p >= 1 && p <= this.totalPages) this.navigateToPage(p); }

  private navigateToPage(p: number) {
    this.page = p;
    // update URL queryparam without reloading
    this.router.navigate([], { queryParams: { page: this.page }, replaceUrl: true }).catch(() => {});
  }

  // utils
  imagePath(filenameOrName?: string): string {
    const raw = (filenameOrName || '').trim();
    // if filename with extension provided, use it encoded
    if (raw && /[.]\w{2,5}$/.test(raw)) return '/assets/images/locations/' + encodeURI(raw);
    // else build safe kebab-case name from title
    const safe = (raw || 'placeholder')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/’|‘|'/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return '/assets/images/locations/' + encodeURI(`${safe}.png`);
  }

  onImageError(e: Event): void {
    const img = e.target as HTMLImageElement;
    img.onerror = null;
    img.src = '/assets/images/locations/placeholder.png';
  }

  trackById(_: number, it: LocationItem): number { return it.id; }

  // extras you can use later
  residentCount(loc: LocationItem): number {
    if (!loc?.residents) return 0;
    return Array.isArray(loc.residents) ? loc.residents.length : Number(loc.residents) || 0;
  }
}
