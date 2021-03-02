import { Component, OnInit, OnChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';
import { CommonService } from '.././common.service';
import { CommunicateService } from '.././communicate.service';
import {Router} from '@angular/router';

import {ExpenseService} from '.././remoteDB/expense.service';
import {EmployeeExpenses} from '.././remoteDB/employee-expenses.model';
import { DatePipe } from '@angular/common';

declare const foxTeam:any;

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
  isRejectActive:boolean = false;
  reason:String;
  validReason:String;
  allExpenseList:EmployeeExpenses[];
  employeeDetails?:Array<string> = [];
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
          console.log(JSON.stringify(error));
        }
      )
      
    }

  ngOnInit(): void {
  }  

  onSelectExpense(event) {    
    //this.expenseDetails = {...event.data};  
    var FoxTeam = new foxTeam();
    this.displayDialog = true;
    this.expenseService.getSelectedExpense(event).subscribe(res => {
      this.expenseDetails = res as EmployeeExpenses[];
    },
    (err) => {
      console.log(err);
    },
    ()=>{
      this.amountApproved = this.expenseDetails['AmountRequested'];
      
      FoxTeam.Ready(async () => {
      FoxTeam.RefreshValues();
      FoxTeam.WhoAmI();
      this.employeeDetails = await FoxTeam.GetEmployeeInfo(this.expenseDetails['EmployeeId'], false);
    }); 
      
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
    if(this.amountApproved < this.expenseDetails['AmountRequested']){
      var approvalStatus = 'PartiallyApproved';
    }
    else{
      
      var approvalStatus = 'Approved';
    }
    var updatedExpenses = {
      _id:this.expenseDetails['_id'],  
      IsPaid: false,
      PaymentRemarks:'',
      PaymentDate:null,
      AmountApproved:this.amountApproved,
      Status:approvalStatus,
      ApporvarUserId:userId,
      ApprovedOn:approvedDate,
      IsApproved:true,
      ApprovalRemarks:this.approvalRemarks
    }
    this.expenseService.updateExpenses(updatedExpenses).subscribe(
      (res)=>{
        this.displayDialog = false;
        this.router.navigate(['list'])
        .then(() => {
          this.getAllExpenses();
        });
      },
      (err)=>{
        console.log("Error");
      }
    );


  }
  rejectExpense() {
    
    this.approvalRemarks = '';
    this.isActive = true;
    this.isRejectActive = true;
    
  }
  approvedExpense(){

    if(this.amountApproved < this.expenseDetails['AmountRequested']){
      this.isActive = true;
    }
    else {
      this.isActive = false;
    }    
  }

  rejectExpenseWithReason() {
    
    var userId = (<HTMLInputElement>document.getElementById('UserId')).value;
    var approvedDate = this.datepipe.transform(new Date, 'dd/MM/yyyy');
    
    if(this.approvalRemarks !=""){
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
           this.isActive = false;
           this.router.navigate(['list'])
           .then(() => {
            this.getAllExpenses();
           });
         },
         (err)=>{
           console.log("Error");
         }
       );
     }
     else {
       this.approvalRemarks = "Please enter Reason";
     }
     
  }
  

}

