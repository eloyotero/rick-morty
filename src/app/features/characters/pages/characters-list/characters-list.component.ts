import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {}
