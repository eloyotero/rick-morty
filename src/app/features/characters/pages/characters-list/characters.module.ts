import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './characters-list.component';

const routes: Routes = [{ path: '', component: CharactersListComponent }];

@NgModule({
  declarations: [CharactersListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CharactersModule {}
