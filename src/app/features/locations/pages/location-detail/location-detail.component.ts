import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface LocationItem {
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
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
<section class="detail-like-location" *ngIf="!loading">
  <button class="back" (click)="back()">← Volver</button>

  <div *ngIf="location; else notFound" class="detail-wrap">
    <div class="left">
      <img [src]="imagePath(location.image || location.name)" [alt]="location.name" (error)="onImageError($event)" />
    </div>

    <div class="right">
      <h1>{{ location.name }}</h1>

      <div class="meta-grid">
        <div class="meta"><span class="label">Tipo</span><div class="value">{{ location.type || '—' }}</div></div>
        <div class="meta"><span class="label">Dimensión</span><div class="value">{{ location.dimension || '—' }}</div></div>
        <div class="meta"><span class="label">Episodios</span><div class="value">{{ episodeCount(location) }}</div></div>
        <div class="meta"><span class="label">Residentes</span><div class="value">{{ residentCount(location) }}</div></div>
      </div>

      <p *ngIf="location.description" class="desc">{{ location.description }}</p>
    </div>
  </div>
</section>

<ng-template #notFound><div class="no-data">Localización no encontrada.</div></ng-template>
<div *ngIf="loading" class="loader">Cargando…</div>
  `,
  styles: [`
:host { display:block; font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#e6eef6; background:#07070a; min-height:100vh; padding:18px; }
.back { background:transparent; border:1px solid rgba(255,255,255,0.04); color:#bfcfe6; padding:6px 10px; border-radius:8px; cursor:pointer; margin-bottom:12px; }
.detail-wrap { display:flex; gap:20px; align-items:flex-start; background:linear-gradient(180deg,#06070a 0%,#0b0d10 100%); padding:16px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); box-shadow:0 6px 18px rgba(2,6,23,0.5); max-width:1100px; }
.left { width:360px; flex:0 0 360px; border-radius:8px; overflow:hidden; background:#0a0a0c; display:flex; align-items:center; justify-content:center; }
.left img { width:100%; height:100%; object-fit:cover; display:block; }
.right { flex:1; display:flex; flex-direction:column; gap:12px; }
.right h1 { margin:0; color:#fff; font-size:1.6rem; }
.meta-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-top:6px; }
.meta { background:rgba(255,255,255,0.02); padding:10px; border-radius:8px; }
.label { display:block; color:#9fb6db; font-size:0.75rem; margin-bottom:6px; }
.value { color:#b9c6d8; font-weight:600; }
.desc { color:#b9c6d8; margin-top:12px; }
.loader { color:#bfcfe6; }
.no-data { color:#ff6b6b; }
  `]
})
export class LocationDetailComponent implements OnInit {
  location: LocationItem | null = null;
  loading = true;
  returnPage = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = idStr ? Number(idStr) : NaN;
    const pageQ = Number(this.route.snapshot.queryParamMap.get('page') || 1);
    this.returnPage = Number.isFinite(pageQ) && pageQ > 0 ? pageQ : 1;

    if (!id) { this.loading = false; return; }

    this.http.get<any>('/assets/locations.json').subscribe({
      next: res => {
        const arr = res?.results ?? res;
        const list = Array.isArray(arr) ? arr : [];
        this.location = list.find((c: any) => Number(c.id) === id) ?? null;
        this.loading = false;
      },
      error: () => { this.location = null; this.loading = false; }
    });
  }

  back(): void { this.router.navigate(['/locations'], { queryParams: { page: this.returnPage } }).catch(() => {}); }

  imagePath(filenameOrName?: string): string {
    const raw = (filenameOrName || '').trim();
    if (raw && /[.]\w{2,5}$/.test(raw)) return '/assets/images/locations/' + encodeURI(raw);
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

  episodeCount(loc: LocationItem | null): number { if (!loc?.episode) return 0; return Array.isArray(loc.episode) ? loc.episode.length : 1; }
  residentCount(loc: LocationItem | null): number { if (!loc?.residents) return 0; return Array.isArray(loc.residents) ? loc.residents.length : Number(loc.residents) || 0; }
}
