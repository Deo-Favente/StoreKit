import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { EditArticleComponent } from '@pages/edit-article/edit-article.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: EditArticleComponent },
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];