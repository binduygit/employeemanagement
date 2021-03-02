import { Injectable } from '@angular/core';

declare const foxTeam:any;

export class AuthService {
  adminUser = false;
  financialEmployee:[];
  empID?:any;

  constructor() { 

    this.empID = (<HTMLInputElement>document.getElementById('EmployeeId')).value;
    var FoxTeam = new foxTeam;
    FoxTeam.Ready(async () => {
      FoxTeam.RefreshValues();
      FoxTeam.WhoAmI();
      this.financialEmployee = await FoxTeam.GetEmployeeInfo(this.empID, false);
      if(this.financialEmployee['IsfinancialCtrl'] === true){
        this.adminUser = true;
      } else {
        this.adminUser = false;
      }
    }); 
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve,reject) => {
        setTimeout(()=> {
          resolve(this.adminUser);
        },800)
      }
    )
    return promise;
  }

 
}