// src/app/features/characters/pages/character-detail/character-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharactersService, CharacterItem } from '../../characters.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: CharacterItem | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private charactersService: CharactersService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.charactersService.getCharacter(id).subscribe({
      next: (data) => { this.character = data ?? null; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
