import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {TabViewModule} from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';  
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import {MenubarModule} from 'primeng/menubar';



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
    CascadeSelectModule,
    TabViewModule,
    InputTextareaModule,
    MenubarModule
  ],
  providers: [AuthService,AuthGuardService,{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

enableProdMode();