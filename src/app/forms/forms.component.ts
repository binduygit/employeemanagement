import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';    
import { PrimeNGConfig } from 'primeng/api';
import { OutputCaptureComponent } from '../output-capture/output-capture.component';
import { ActivatedRoute, Router } from '@angular/router';
import {ExpenseService} from '.././remoteDB/expense.service';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';

declare const foxTeam:any;
interface Expenses {
  name: string, 
  key: string
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers:[DatePipe]
})
export class FormsComponent implements OnInit, AfterViewInit { 
  @ViewChild('f') expenseForm: NgForm;
  
  expenseType?: Expenses[];
  allProjectList?:any;
  subProjectList = [];
  employeeInfo?:Array<string> = [];
  isActive?:boolean = false;
  BranchId?:String;
  CompanyId?:String;
  BaseUrl?: String;
  EmployeeId?:any;

  @ViewChild(OutputCaptureComponent, {static: true}) outputCapture:OutputCaptureComponent;
  constructor( private primengConfig: PrimeNGConfig, private datepipe: DatePipe, private router: Router, private route:ActivatedRoute, private expenseService:ExpenseService) { 
    
    this.CompanyId = (<HTMLInputElement>document.getElementById('CompanyId')).value;
    this.BaseUrl = (<HTMLInputElement>document.getElementById('BaseUrl')).value;
    this.BranchId = (<HTMLInputElement>document.getElementById('BranchId')).value;
    this.EmployeeId = (<HTMLInputElement>document.getElementById('EmployeeId')).value;
  }

  subProjects(){
    console.log("Not implemented yet" + this.expenseForm.value.expenseData.selectAssignment);
    var FoxTeam = new foxTeam;
      if(this.expenseForm.value.expenseData.selectAssignment){
      let code = this.expenseForm.value.expenseData.selectAssignment['ProjectCode'];
      if(code){
        FoxTeam.Ready(async () => {
          FoxTeam.RefreshValues();
          FoxTeam.WhoAmI();
          this.subProjectList = await FoxTeam.GetSubProjects(code, false);
          if(this.subProjectList.length){
            this.isActive = true;
          } 
          else{
          this.isActive = false;
          }
        });
      }
    }
  }

  ngAfterViewInit() {

    //console.log('Values on ngAfterViewInit():');
    //console.log("primaryColorSample:", this.outputCapture.getCapture());
  }  


  private newMethod() {
    return this;
  }

  onSubmit(){
    console.log("form viewChild",this.expenseForm.value.expenseData);
    
    var totalExpenses = this.expenseForm.value.expenseData.expensesValue + this.expenseForm.value.expenseData.expensesTax;
    var expenseDate = this.datepipe.transform(this.expenseForm.value.expenseData.expenseDate, 'dd/MM/yyyy');
    var addExpenseValues = {
      EmployeeId: this.EmployeeId,
      CompanyId: this.CompanyId,
      ExpenseId: this.expenseForm.value.expenseData.selectExpenseType['name'],
      ProjectCode: this.expenseForm.value.expenseData.selectAssignment['ProjectTitle'],
      SubProjectId: this.expenseForm.value.expenseData.selectSubProject['SubProjectTitle'],
      ExpenseDate: expenseDate,
      AmountRequested: totalExpenses,
      AmountApproved: 0,
      DocumentsSubmitted: '',
      Status:'Submitted',
      ApporvarUserId:'',
      ApprovedOn:null,
      IsApproved:false,
      IsPaid: false,
      PaymentRemarks:'',
      PaymentDate:null,
      ApprovalRemarks:''
    }
    this.expenseService.postExpense(addExpenseValues).subscribe(
      (res)=>{
        console.log("Successful");
        this.router.navigate(['view'])
      }
    );
    
  }

  ngOnInit(): void {
     var FoxTeam = new foxTeam;
     FoxTeam.Ready(async() => {
        FoxTeam.RefreshValues();
        FoxTeam.WhoAmI();
        this.employeeInfo = await FoxTeam.GetEmployeeInfo(this.EmployeeId, false);
        this.allProjectList = await FoxTeam.GetProjects(false);
      }); 

    this.expenseType = [
        {name: 'Food/Breverages', key:'FB'},
        {name:'Internet/Telephone', key:'IT'},
        {name:'Accomodation', key:'ACC'},
        {name:'Travel- Public Transport', key:'TPUB'},
        {name:'Travel- Private Transport', key:'TPRI'},
        {name:'Other Expenses', key:'OE'}
      ];   
       
  }

}



