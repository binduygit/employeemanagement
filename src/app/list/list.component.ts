import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ApiService]
})
export class ListComponent implements OnInit, OnChanges {

  personalList: Array<string> = [];
  fieldList:Array<string> = [];

  constructor(private api: ApiService) {
    this.getAllExpenses();

   }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  getAllExpenses = ()=>{
    this.api.getExpenses().subscribe(
      data => {
        this.personalList = data.personalData;
        this.fieldList = data.cols;
      }, 
      error => {
        console.log(error);
      }

    )
  }
  

  ngOnInit(): void {
  }

  

}
