import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DB_PROVIDERS } from './db';
import { SignupComponent } from './signup/signup.component';
import { TunesComponent } from './tunes/tunes.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    TunesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DB_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
