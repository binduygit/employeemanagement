import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ListComponent } from './list/list.component';
import { FormListComponent } from './form-list/form-list.component';
import {AuthGuardService} from './auth-guard.service';

const appRoutes: Routes = [
    {path:'', component: FormsComponent},
    {path:'list',canActivate:[AuthGuardService],component: FormListComponent},
    {path:'view',component:ListComponent}
  ];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{enableTracing:true, onSameUrlNavigation: 'reload', useHash: true})
  
    ],
    exports:[RouterModule]
})

export class AppRoutingModule { }
