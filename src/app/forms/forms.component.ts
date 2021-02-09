import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { OutputCaptureComponent } from '../output-capture/output-capture.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '.././api.service';


interface Expenses {
  name: string,
  key: string
}

interface Project{
  ProjectCode: string,
  ProjectTitle: string,
  subprojects: Array<string>
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, AfterViewInit { 
  date1: Date | undefined;
  date2: Date |  undefined;
  expenseType?: Expenses[];
  selectProject?:Project[];
  selectExpenseType?: Expenses;
  expLocation?: String;
  allProjectList=[];
  expensesValue?:number;
  expensesTax?:number;
  projectName?: string;
  selectAssignment?:String;
  addExpenseValues: Array<string> = [];
  projects:Array<string> = [];
  subprojects = [];
  userId?:String;
  employeeInfo?:Array<string> = [];
  

  @ViewChild(OutputCaptureComponent, {static: true}) outputCapture:OutputCaptureComponent;
  constructor(private api: ApiService, private primengConfig: PrimeNGConfig, private route:ActivatedRoute) { 
    this.userId = (<HTMLInputElement>document.getElementById('UserId')).value;
    this.getEmployeeInfo()
  }

  getEmployeeInfo = ()=>{
    this.api.getEmploy(this.userId).subscribe(
      data =>{
        this.employeeInfo = data;
        console.log(this.employeeInfo);
      },
      error => {
        console.log(error);
      }
      
    )

    
  }
  
  getProjects = ()=>{
    this.api.getProjectList().subscribe(
      data => {
        this.projects = data;
        data.forEach(ProjectCode => {
          this.api.getSubProjectList(ProjectCode.ProjectCode).subscribe(
            data => {
              this.subprojects = data;
            },
            error=>{
              this.subprojects = [];
            },
            () => {
              this.selectProject = [
                {
                  ProjectCode:ProjectCode.ProjectCode,
                  ProjectTitle:ProjectCode.ProjectTitle,
                  subprojects: this.subprojects
                }              
              ];
              this.allProjectList = Array.from(new Set(this.allProjectList.concat(this.selectProject)));
            }
          )
          
          
          //this.allProjectList= [this.allProjectList, ...this.selectProject];        
        }); 
      },
      error => {
        console.log(error);
      }
      
    )
      
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
    console.log(userId);
    var  addExpenseValues = {
        empId: userId,
        companyName: companyId,
        expenseType: this.selectExpenseType,
        project: this.selectAssignment,
        subProject: this.selectAssignment,
        fromDate: this.date1,
        toDate: this.date2,
        amount: totalExpenses,
        status: "Pending"
    }
    
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



