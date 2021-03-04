import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service';
import {MenuItem} from 'primeng/api';

declare const foxTeam:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  empID?:any;
  financialEmployee?:Array<string> = [];

  constructor(private api:ApiService) {
    this.empID = (<HTMLInputElement>document.getElementById('EmployeeId')).value;
  /*  var FoxTeam = new foxTeam;
   FoxTeam.Ready(async () => {
      FoxTeam.RefreshValues();
      FoxTeam.WhoAmI();

      this.financialEmployee = await FoxTeam.GetEmployeeInfo(this.empID, false);
      console.log(this.financialEmployee);
      this.addItems();
    });
  */
   
   }

   addItems = () => {
    console.log("Is Financial Controller"+this.financialEmployee['IsfinancialCtrl']);
    if(this.financialEmployee['IsfinancialCtrl']===true){
      this.items = [
        {
          label:'Add Expenses',
          icon:'pi pi-fw pi-pencil',
          routerLink: '/'
          
        },          
        {
          label:'Admin View',
          icon:'pi pi-fw pi-book',
          routerLink: '/list'
        },
        {
          label:'Expenses List',
          icon:'pi pi-fw pi-book',
          routerLink: '/view'
        }
      ];
    } else {
      this.items = [
        {
          label:'Add Expenses',
          icon:'pi pi-fw pi-pencil',
          routerLink: '/'
          
        },
        {
          label:'Expenses List',
          icon:'pi pi-fw pi-book',
          routerLink: '/view'
        }
      ];
    }
  }

  ngOnInit() {
    this.items = [
      {
        label:'Add Expenses',
        icon:'pi pi-fw pi-pencil',
        routerLink: '/'
        
      },          
      {
        label:'Admin View',
        icon:'pi pi-fw pi-book',
        routerLink: '/list'
      },
      {
        label:'Expenses List',
        icon:'pi pi-fw pi-book',
        routerLink: '/view'
      }
    ];
  }
}
