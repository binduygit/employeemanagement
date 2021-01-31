import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { OutputCaptureComponent } from './output-capture/output-capture.component';
import { FormListComponent } from './form-list/form-list.component';
import {TableModule } from 'primeng/table';
import { ListComponent } from './list/list.component';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {ContextMenuModule} from 'primeng/contextmenu';


const appRoutes: Routes = [
  {path:'', component: FormsComponent},
  {path:'list',component: FormListComponent},
  {path:'view',component:ListComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    HeaderComponent,
    FooterComponent,
    OutputCaptureComponent,
    FormListComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,     
    FileUploadModule,
    FormsModule,
    TableModule,
    AppRoutingModule,
    DialogModule,
    DataViewModule,
    ContextMenuModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


