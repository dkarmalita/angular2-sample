import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth.guard';

import { PostsComponent } from './posts.component';
import { NewPostComponent } from './new-post.component';
import { EditPostComponent } from './edit-post.component';
import { PostDetailsComponent } from './post-details.component';

const routes: Routes = [
//  { path: '', redirectTo: 'admin' },
//  { path: 'admin', component: PostsComponent },
  { path: '', component: PostsComponent },
  {
    path: 'new',
    component: NewPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: 'view/:id',
    component: PostDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostsRoutingModule { }
