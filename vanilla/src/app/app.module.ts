import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AuthService } from './core/auth.service';
import { ApiService } from './core/api.service';
import { PostService } from './core/post.service';
import { Jwt } from './core/jwt.service';
import { AuthGuard } from './core/auth.guard';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AboutModule} from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // Angular modules
    BrowserModule,
    FormsModule,
    HttpModule,

    //3rd party modules
    Ng2BootstrapModule,

    // App modules
    AppRoutingModule,
    CoreModule,

    AdminModule,
    AboutModule,
    SharedModule,
    HomeModule
  ],
  providers: [

    // Global (Singletone) Services
    ApiService,
    AuthService,
    Jwt,
    PostService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
