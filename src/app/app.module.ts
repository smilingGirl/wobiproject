import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BasicViewComponent } from './basic-view/basic-view.component';
import { WobiFormComponent } from './wobi-new-form/wobi-new-form.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

import { SharedService } from './services/shared.service';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

// Define the routes
const appRoutes: Routes = [
  { path: 'worlds/:id/info', component: DetailViewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    WobiFormComponent,
    DetailViewComponent,
    HelpDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [NgxSmartModalService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
