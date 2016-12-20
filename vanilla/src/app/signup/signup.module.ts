import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';


@NgModule({
  imports: [
    CommonModule,          // ngIf ERROR
    FormsModule,
    ReactiveFormsModule,    // formGroup ERROR

    SharedModule,
    SignupRoutingModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
