import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';


import { AppComponent } from './app.component';
import { BasicViewComponent } from './basic-view/basic-view.component';
import { wobiFormComponent } from './nedit-form/wobi-form.component';

// Define the routes


@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    wobiFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild()
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
