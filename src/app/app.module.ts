import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DB_PROVIDERS } from './db';
import { SignupComponent } from './signup/signup.component';
import { TunesComponent } from './tunes/tunes.component';
import { TunesModule } from './tunes/tunes.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TunesModule
  ],
  providers: [DB_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
