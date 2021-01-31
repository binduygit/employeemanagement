import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';
import * as $ from 'jQuery';
import { CommonService } from '.././common.service';
import { CommunicateService } from '.././communicate.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css'],
  providers: [ApiService]
})
export class FormListComponent implements OnInit,OnChanges {

  expenseList: Array<string> = [];
  expenseDetails: Array<string> = [];
  cols:Array<string> = [];
  displayDialog: boolean = false;
  displayImageDialog: boolean = false;
  

  constructor(private api: ApiService, private CommonService:CommonService, private CommunicateService:CommunicateService) {
    this.getAllExpenses();

   }
  ngOnChanges(): void{
    this.CommonService.logInfo("formListComponent","ngOnChange");
  }
   getAllExpenses = ()=>{
      this.api.getExpenses().subscribe(
        data => {
          this.expenseList = data.data;
          this.cols = data.cols;
          
        }, 
        error => {
          console.log(error);
        }
      )
    }

  ngOnInit(): void {
   
  }  

  onSelectExpense(event) {    
    this.expenseDetails = {...event.data};    
    this.displayDialog = true;
  }

  viewFullImage() {
    this.displayImageDialog = true;
  }
  approveExpense() {
    this.displayDialog = false;
  }
  rejectExpense() {
    this.displayDialog = false;
  }
}
