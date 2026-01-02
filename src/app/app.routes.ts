import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { CreateComponent } from '@pages/create/create.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];