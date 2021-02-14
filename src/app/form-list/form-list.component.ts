import { Component, OnInit, OnChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';
import { CommonService } from '.././common.service';
import { CommunicateService } from '.././communicate.service';
import {Router} from '@angular/router';

import {ExpenseService} from '.././remoteDB/expense.service';
import {EmployeeExpenses} from '.././remoteDB/employee-expenses.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css'],
  providers: [ApiService, ExpenseService,DatePipe]
})


 
export class FormListComponent implements OnInit,OnChanges {

  expenseList: any[];
  expenseDetails: EmployeeExpenses[];
  cols:Array<string> = [];
  displayDialog: boolean = false;
  displayImageDialog: boolean = false;
  displayReason: boolean = false; 
  isActive: boolean = false;
  reason:String;
  validReason:String;
  allExpenseList:EmployeeExpenses[];
  employeeDetails:[];
  amountApproved:Number;
  approvalRemarks:String;

  constructor(private api: ApiService, private router: Router, private datepipe: DatePipe, private CommonService:CommonService, private expenseService:ExpenseService, private CommunicateService:CommunicateService) {
    this.getAllExpenses();

   }
  ngOnChanges(): void{
    this.CommonService.logInfo("formListComponent","ngOnChange");
  }
  

   getAllExpenses = ()=>{
      this.expenseService.getAllEmployeeExpenses().subscribe(
        (res) => {
          this.expenseService.expenses = res as unknown as EmployeeExpenses[];  
          this.allExpenseList = this.expenseService.expenses;        
        }, 
        error => {
          console.log(error);
        }
      )
      
    }

  ngOnInit(): void {
   
  }  

  onSelectExpense(event) {    
    //this.expenseDetails = {...event.data};  
    console.log(event);  
    this.displayDialog = true;
    this.expenseService.getSelectedExpense(event).subscribe(res => {
      this.expenseDetails = res as EmployeeExpenses[];
    },
    (err) => {
      console.log(err);
    },
    ()=>{
      console.log(this.expenseDetails);
      this.api.getEmploy(this.expenseDetails['EmployeeId']).subscribe(
        (data) => {
          this.employeeDetails = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    
    );

   
  }

  viewFullImage() {
    this.displayImageDialog = true;
  }
  approveEmployeeExpense() {
   // this.displayDialog = false;
   var userId = (<HTMLInputElement>document.getElementById('UserId')).value;
   var approvedDate = this.datepipe.transform(new Date, 'dd/MM/yyyy');
    this.isActive = false;
    if(this.amountApproved && this.amountApproved !== this.expenseDetails['AmountRequested']){
    }
    else{
      this.amountApproved = this.expenseDetails['AmountRequested'];
    }

    var updatedExpenses = {
      _id:this.expenseDetails['_id'],  
      IsPaid: false,
      PaymentRemarks:'',
      PaymentDate:null,
      AmountApproved:this.amountApproved,
      Status:'Approved',
      ApporvarUserId:userId,
      ApprovedOn:approvedDate,
      IsApproved:true,
      ApprovalRemarks:this.approvalRemarks
    }
    this.expenseService.updateExpenses(updatedExpenses).subscribe(
      (res)=>{
        console.log("Successful");
        this.displayDialog = false;
        this.router.navigate(['list'])
        .then(() => {
          window.location.reload();
        });
      },
      (err)=>{
        console.log("Error");
      }
    );


  }
  rejectExpense() {
    
    this.isActive = true;
    var userId = (<HTMLInputElement>document.getElementById('UserId')).value;
   var approvedDate = this.datepipe.transform(new Date, 'dd/MM/yyyy');
    this.isActive = false;
    
    
    var rejectedExpense = {
      _id:this.expenseDetails['_id'],  
      IsPaid: false,
      PaymentRemarks:'',
      PaymentDate:null,
      Status:'Rejected',
      ApporvarUserId:userId,
      ApprovedOn:approvedDate,
      IsApproved:false,
      ApprovalRemarks:this.approvalRemarks
    }
    this.expenseService.updateExpenses(rejectedExpense).subscribe(
      (res)=>{
        console.log("Successful");
        this.displayDialog = false;
        this.router.navigate(['list'])
        .then(() => {
          window.location.reload();
        });
      },
      (err)=>{
        console.log("Error");
      }
    );


    
  }
  approvedExpense(newValue:Number){

    

    if(newValue < this.expenseDetails['AmountRequested']){
      this.isActive = true;
      this.amountApproved = newValue;
    }
    else {
      this.isActive = false;
    }
    
  }
}
