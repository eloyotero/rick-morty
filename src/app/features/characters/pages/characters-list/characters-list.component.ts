import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Character {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters = signal<Character[]>([]);
  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  ngOnInit() {
    fetch('assets/characters.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        this.characters.set(
          list.map((c: any, i: number) => ({
            id: i + 1,
            name: String(c.name ?? 'Sin nombre'),
            image: String(c.image ?? '')
          }))
        );
        this.totalPages = Math.ceil(this.characters().length / this.pageSize);
      })
      .catch(err => console.error('Error cargando personajes:', err));
  }

  filteredCharacters(): Character[] {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.characters().filter(c =>
      c.name.toLowerCase().includes(term)
    );
    const start = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  imagePath(path: string): string {
 
    return path || 'assets/images/characters/placeholder.png';
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement | null;
    if (!img) return; // seguridad extra
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/characters/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
  
  
  
  
}
