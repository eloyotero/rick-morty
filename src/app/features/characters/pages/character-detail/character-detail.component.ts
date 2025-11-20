import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface CharacterItem {
  id: number;
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
  location?: string;
  episode?: string[] | string;
  image?: string;
  url?: string;
}

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
<section class="detail-like-location" *ngIf="!loading">
  <button class="back" (click)="back()">← Volver</button>

  <div *ngIf="character; else notFound" class="detail-wrap">
    <div class="left">
      <img [src]="imagePath(character.image)" [alt]="character.name" (error)="onImageError($event)" />
    </div>

    <div class="right">
      <h1>{{ character.name }}</h1>

      <div class="meta-grid">
        <div class="meta"><span class="label">Estado</span><div class="value">{{ character.status || 'Unknown' }}</div></div>
        <div class="meta"><span class="label">Especie</span><div class="value">{{ character.species || 'Unknown' }}</div></div>
        <div class="meta"><span class="label">Género</span><div class="value">{{ character.gender || 'Unknown' }}</div></div>
        <div class="meta"><span class="label">Origen</span><div class="value">{{ character.origin || 'Unknown' }}</div></div>
        <div class="meta"><span class="label">Ubicación</span><div class="value">{{ character.location || 'Unknown' }}</div></div>
        <div class="meta"><span class="label">Episodios</span><div class="value">{{ episodeCount(character) }}</div></div>
      </div>

      <div class="actions-row">
        <a class="btn-primary" *ngIf="character.url" [href]="character.url" target="_blank" rel="noopener">Ver API</a>
      </div>
    </div>
  </div>
</section>

<ng-template #notFound>
  <div class="no-data">Personaje no encontrado.</div>
</ng-template>

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

.actions-row { margin-top:12px; display:flex; gap:8px; }
.btn-primary { background:linear-gradient(180deg,#2b6ef6,#1f50d8); color:#fff; padding:8px 12px; border-radius:8px; text-decoration:none; font-weight:600; }

/* small helpers */
.loader { color:#bfcfe6; }
.no-data { color:#ff6b6b; }
  `]
})
export class CharacterDetailComponent implements OnInit {
  character: CharacterItem | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = idStr ? Number(idStr) : NaN;
    if (!id) { this.loading = false; return; }

    this.http.get<any>('/assets/characters.json').subscribe({
      next: res => {
        const arr = res?.results ?? res;
        const list = Array.isArray(arr) ? arr : [];
        this.character = list.find((c: any) => Number(c.id) === id) ?? null;
        this.loading = false;
      },
      error: () => { this.character = null; this.loading = false; }
    });
  }

  back(): void { this.router.navigate(['/characters']).catch(() => {}); }
  imagePath(filename?: string): string { return '/assets/images/characters/' + ((filename || 'placeholder.png').trim()); }
  onImageError(e: Event): void { const img = e.target as HTMLImageElement; img.onerror = null; img.src = '/assets/images/characters/placeholder.png'; }
  episodeCount(ch: CharacterItem | null): number { if (!ch?.episode) return 0; return Array.isArray(ch.episode) ? ch.episode.length : 1; }
}
