import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TunesComponent } from './tunes.component';
import { AddtuneComponent } from './addtune/addtune.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    TunesComponent,
    AddtuneComponent
  ],
  providers: [
    TunesComponent
  ]
})
export class TunesModule {
}
