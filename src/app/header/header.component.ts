import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  empID?:String;
  financialEmployee?:Array<string> = [];

  constructor(private api:ApiService) {
    this.empID = (<HTMLInputElement>document.getElementById('UserId')).value;
    this.getEmployeeInfo();
   }

  getEmployeeInfo = ()=>{
    this.api.getEmploy(this.empID).subscribe(
      data =>{
        this.financialEmployee = data;
        console.log(this.financialEmployee);
      },
      error => {
        console.log(error);
      }
      
    )

    
  }

  ngOnInit(): void {
  }

}
