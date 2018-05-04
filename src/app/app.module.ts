import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { BasicViewComponent } from './basic-view/basic-view.component';
import { wobiFormComponent } from './nedit-form/wobi-form.component';

// Define the routes
const appRoutes: Routes = [
  { path: 'worlds', component: BasicViewComponent },
  { path: 'worlds/:id',      component: BasicViewComponent},
  { path: ':WorldID/characters',      component: BasicViewComponent},
  { path: ':WorldID/characters/:id',      component: BasicViewComponent},
  { path: ':WorldID/cultures',      component: BasicViewComponent},
  { path: ':WorldID/cultures/:id',      component: BasicViewComponent},
  { path: ':WorldID/countries',      component: BasicViewComponent},
  { path: ':WorldID/countries/:id',      component: BasicViewComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    wobiFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild()
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
