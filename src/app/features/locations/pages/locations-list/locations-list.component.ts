import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Location {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  locations = signal<Location[]>([]);
  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  ngOnInit() {
    fetch('assets/locations.json')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        this.locations.set(
          list.map((l: any, i: number) => ({
            id: i + 1,
            name: String(l.name ?? 'Sin nombre'),
            image: String(l.image ?? '')
          }))
        );
        this.totalPages = Math.ceil(this.locations().length / this.pageSize);
      })
      .catch(err => console.error('Error cargando localizaciones:', err));
  }

  filteredLocations(): Location[] {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.locations().filter(l =>
      l.name.toLowerCase().includes(term)
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
    return path || 'assets/images/locations/placeholder.png';
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackSet'] === 'true') return;
    img.src = 'assets/images/locations/placeholder.png';
    img.dataset['fallbackSet'] = 'true';
  }
  
  
}
