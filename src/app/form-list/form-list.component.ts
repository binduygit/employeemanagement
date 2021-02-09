import { Component, OnInit, OnChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';
import { CommonService } from '.././common.service';
import { CommunicateService } from '.././communicate.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css'],
  providers: [ApiService]
})


 
export class FormListComponent implements OnInit,OnChanges {

  expenseList: any[];
  expenseDetails: Array<string> = [];
  cols:Array<string> = [];
  displayDialog: boolean = false;
  displayImageDialog: boolean = false;
  displayReason: boolean = false; 
  isActive: boolean = false;

  reactiveForm = new FormGroup({
    expenseAmount: new FormControl(),
    approvedAmount: new FormControl()
  })
  

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
   
    this.reactiveForm.get("approvedAmount").valueChanges.subscribe(selectedValue => {
      console.log('approvedAmount changed');
      console.log(selectedValue);
    })
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
    this.isActive = false;
  }
  rejectExpense() {
    this.isActive = true;
  }
  partialApproved(){
    this.displayDialog = false;
  }
}
