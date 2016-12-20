import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    ShowAuthedDirective,
    ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ShowAuthedDirective,
  ],
})
export class SharedModule { }
