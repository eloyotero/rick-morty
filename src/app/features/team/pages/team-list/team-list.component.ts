import { Component } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  members = [
    {
      id: 1,
      name: 'ELOY',
      role: 'Frontend Developer',
      stack: 'Angular, Angular Material, TypeScript',
      bio: 'Apasionado por construir apps modulares, limpias y listas para producción.',
    },
  ];
}
