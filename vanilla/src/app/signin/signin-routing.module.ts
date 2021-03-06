import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
/*
const routes: Routes = [
  { path: '', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent }
];
*/
const routes: Routes = [
  { path: '', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SigninRoutingModule { }
