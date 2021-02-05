import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { OutputCaptureComponent } from '../output-capture/output-capture.component';
import { ActivatedRoute } from '@angular/router';

interface City {
  name: string,
  code: string
}
interface projectWork {
  name: string,
  code: string
}
interface Expenses {
  name: string,
  key: string
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
  selectExpenseType?: Expenses;
  cities?: City[];
  selectedCity1?: City;
  assignments?: any[];
  expensesValue?:number;
  expensesTax?:number;

  @ViewChild(OutputCaptureComponent, {static: true}) outputCapture:OutputCaptureComponent;
  constructor(private primengConfig: PrimeNGConfig, private route:ActivatedRoute) { 
    
  }

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("primaryColorSample:", this.outputCapture.getCapture());
  }  


  private newMethod() {
    return this;
  }

  ngOnInit(): void {
    this.expenseType = [
        {name: 'Food/Breverages', key:'FB'},
        {name:'Internet/Telephone', key:'IT'},
        {name:'Accomodation', key:'ACC'},
        {name:'Travel- Public Transport', key:'TPUB'},
        {name:'Travel- Private Transport', key:'TPRI'},
        {name:'Other Expenses', key:'OE'}
      ];   
      
    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

   /* 
    this.assignments = [
      {name: 'Project1', code: 'P1'},
      {name: 'Project2', code: 'P2'},
      {name: 'Project3', code: 'P3'},
      {name: 'Project4', code: 'P4'},
      {name: 'Project5', code: 'P5'}
    ];
    */

   this.assignments = [
    {
        name: 'Google',
        code: 'P1',
        subprojects: [
            {
              subname: 'Docs', 
                code: 'sa'                       
            },
            {
              subname: 'Photos',
                code: 'sb'                       
            },
            {
              subname: 'Drive',
                code: 'sc'                       
            }            
        ]
          },
          {
              name: 'Amazon', 
              code: 'P2',
              subprojects: [
                  {
                    subname: 'AWS',
                      code: 'sx'                      
                  },
                  {
                    subname: 'Prime',
                      code: 'sy'                    
                  },
                  {
                    subname: 'Audible',
                    code: 'sz'                  
                }                  
              ]
          },
          {
              name: 'Microsoft',
              code: 'P3',
              subprojects: [
                  {
                    subname: 'hotmail',
                      code: 's1'
                  },
                  {
                    subname: 'yahoo',
                      code: 's2'
                  },
                  {
                    subname: 'desktop',
                      code: 's3'
                  }
              ]
          }
      ];
    
  }
  
}
