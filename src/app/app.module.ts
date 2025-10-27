import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CharactersListComponent } from './features/characters/pages/characters-list/characters-list.component'; // ✅ Ajusta el path si es necesario

const routes: Routes = [
  { path: '', component: CharactersListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
