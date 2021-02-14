import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { OutputCaptureComponent } from '../output-capture/output-capture.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '.././api.service';
import {ExpenseService} from '.././remoteDB/expense.service';
import { DatePipe } from '@angular/common';


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
  date1: Date | undefined;
  date2: Date |  undefined;
  expenseType?: Expenses[];
  selectProject?:[];
  selectExpenseType?:String;
  expLocation?: String;
  allProjectList=[];
  expensesValue?:number;
  expensesTax?:number;
  projectName?: string;
  selectAssignment?:[];
 
  projects:Array<string> = [];
  subProjectList = [];
  userId?:String;
  employeeInfo?:Array<string> = [];
  isActive?:boolean = false;
  selectSubProject?:[];

  @ViewChild(OutputCaptureComponent, {static: true}) outputCapture:OutputCaptureComponent;
  constructor(private api: ApiService, private primengConfig: PrimeNGConfig, private datepipe: DatePipe, private router: Router, private route:ActivatedRoute, private expenseService:ExpenseService) { 
    this.userId = (<HTMLInputElement>document.getElementById('UserId')).value;
    this.getEmployeeInfo()
  }

  getEmployeeInfo = ()=>{
    this.api.getEmploy(this.userId).subscribe(
      data =>{
        this.employeeInfo = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  
  getProjects = ()=>{
    this.api.getProjectList().subscribe(
      data => {
        this.allProjectList = data;
      },
      error => {
        this.allProjectList = [];
      }
      
    )
      
  }

  subProjects(){
    var code = this.selectAssignment['ProjectCode'];
    if(code){
      this.api.getSubProjectList(code).subscribe(
        data => {
          this.subProjectList= data;
          if(data.length){
            this.isActive = true;
          } 
          else{
          this.isActive = false;
          }
        },
        error => {
          this.isActive = false;
          this.subProjectList = [];
        },
        () => {
          //console.log(this.subProjectList);
        }
      )
    }
  }

  ngAfterViewInit() {

    //console.log('Values on ngAfterViewInit():');
    //console.log("primaryColorSample:", this.outputCapture.getCapture());
  }  


  private newMethod() {
    return this;
  }

  addExpenses(){
    var userId = (<HTMLInputElement>document.getElementById('UserId')).value;
    var companyId = (<HTMLInputElement>document.getElementById('CompanyId')).value;
    var totalExpenses = this.expensesValue + this.expensesTax;
    var expenseDate = this.datepipe.transform(this.date1, 'dd/MM/yyyy');
    var addExpenseValues = {
      EmployeeId: userId,
      CompanyId: companyId,
      ExpenseId: this.selectExpenseType['name'],
      ProjectCode: this.selectAssignment['ProjectTitle'],
      SubProjectId: this.selectSubProject['SubProjectTitle'],
      ExpenseDate: expenseDate,
      AmountRequested: totalExpenses,
      AmountApproved: 0,
      DocumentsSubmitted: '',
      Status:'Pending',
      ApporvarUserId:'',
      ApprovedOn:null,
      IsApproved:false,
      IsPaid: false,
      PaymentRemarks:'',
      PaymentDate:null,
      ApprovalRemarks:''
    }
    console.log(addExpenseValues);
    this.expenseService.postExpense(addExpenseValues).subscribe(
      (res)=>{
        console.log("Successful");
        this.router.navigate(['view'])
      }
    );
    
  }


  ngOnInit(): void {

    this.getProjects();

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



