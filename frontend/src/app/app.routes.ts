import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { EditArticleComponent } from '@pages/edit-article/edit-article.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StatsComponent } from './pages/stats/stats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: EditArticleComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];