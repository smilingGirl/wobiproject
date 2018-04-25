import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { wobiFormComponent } from './wobi-form.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'worlds',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    wobiFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    wobiFormComponent
  ]
})
export class AppModule { }
