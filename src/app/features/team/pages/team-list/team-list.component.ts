import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
};

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  loading = false;

  team: TeamMember[] = [
    {
      id: 1,
      name: 'Dan Harmon',
      role: 'Creador',
      image: 'https://via.placeholder.com/300x180?text=Dan+Harmon',
      description:
        'Creador de Rick and Morty, responsable de la narrativa y el tono de la serie.',
    },
    {
      id: 2,
      name: 'Justin Roiland',
      role: 'Creador y Voz',
      image: 'https://via.placeholder.com/300x180?text=Justin+Roiland',
      description:
        'Creador y voz original de Rick y Morty, con estilo irreverente y creativo.',
    },
    {
      id: 3,
      name: 'Ryan Elder',
      role: 'Compositor',
      image: 'https://via.placeholder.com/300x180?text=Ryan+Elder',
      description:
        'Compositor de la música de la serie, aporta atmósfera y ritmo a cada episodio.',
    },
  ];

  simulateLoading() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 1200);
  }
}
