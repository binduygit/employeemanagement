import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {EmployeeExpenses} from './employee-expenses.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  employeeExpense:EmployeeExpenses;
  expenses: EmployeeExpenses[];
  readonly baseURL = 'http://localhost:3000/expenses/';

  constructor(private http: HttpClient) { }

  postExpense(expense: EmployeeExpenses){
    return this.http.post(this.baseURL, expense);
  }

  updateExpenses(expense){
    return this.http.post(this.baseURL, expense);
  }

  getEmployeeExpense(userId){
    const url = this.baseURL+'list/'+userId;
    return this.http.get(url);
  }

  getAllEmployeeExpenses(){
    return this.http.get(this.baseURL);
  }
  getSelectedExpense(id){
    const url = this.baseURL+id;
    return this.http.get(url);
  }

}
