import { Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing';
import { PostListComponent } from './components/post-list/post-list';
import { PostCreateComponent } from './components/post-create/post-create';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { MoodCheckinComponent } from './components/mood-checkin/mood-checkin';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'new', component: PostCreateComponent },
  { path: 'mood', component: MoodCheckinComponent },
  { path: '**', redirectTo: '' }
];