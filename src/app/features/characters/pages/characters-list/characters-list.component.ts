// src/app/features/characters/pages/characters-list/characters-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharactersService, Character } from '../../characters.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  characters: Character[] = [];
  loading = true;

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe({
      next: (data) => {
        this.characters = data.results;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
