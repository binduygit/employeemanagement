import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '.././api.service';
import {ExpenseService} from '.././remoteDB/expense.service';
import {EmployeeExpenses} from '.././remoteDB/employee-expenses.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ExpenseService]
})
export class ListComponent implements OnInit, OnChanges {


  userId?:String;
  personalExpenseList:EmployeeExpenses[];

  constructor(private api: ApiService, private expenseService: ExpenseService) {
    
    this.userId = (<HTMLInputElement>document.getElementById('UserId')).value;
    this.getAllExpenses();

   }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  getAllExpenses = ()=>{
    this.expenseService.getEmployeeExpense(this.userId).subscribe((res) => {
        this.expenseService.expenses = res as unknown as EmployeeExpenses[];
        this.personalExpenseList = this.expenseService.expenses;
      }, 
      error => {
        console.log(error);
      }

    )
  }
  

  ngOnInit(): void {
  }

}
