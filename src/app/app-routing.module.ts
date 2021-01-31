import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormsComponent } from './forms/forms.component';  
import { ListComponent } from './list/list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component: FormsComponent},
    {path:'list',component: FormListComponent},
    {path:'view', component:ListComponent}
  ])
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
