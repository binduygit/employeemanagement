

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient) { }
  
  getExpenses(): Observable<any>{
    return this.http.get('assets/expensesList.json',
    {headers: this.httpHeaders})
  }
  /*getOneMovie(id): Observable<any>{
    return this.http.get(this.baseUrl+'/movies/'+id+'/',
    {headers: this.httpHeaders})
  }*/
  /*console.log(ExpenseList[]);

  getExpenses() {
    return this.http.get<any>('assets/expensesList.json')
        .toPromise()
        .then(res => <ExpenseList[]> res.data)
        .then(data => data);
  }*/
}
