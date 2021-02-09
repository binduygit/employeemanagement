import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  readonly BaseUrl = (<HTMLInputElement>document.getElementById('BaseUrl')).value;
  readonly CompanyId = (<HTMLInputElement>document.getElementById('CompanyId')).value;
  readonly UserId = (<HTMLInputElement>document.getElementById('UserId')).value;
 

  httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient) { }
  
  getExpenses(): Observable<any>{
    return this.http.get('assets/expensesList.json',
    {headers: this.httpHeaders})
  }

  getProjectList(): Observable<any>{
    const url = this.BaseUrl+'\\Timesheet\\GetProjectList?CompanyId='+this.CompanyId;
    return this.http.get(url, {headers: this.httpHeaders})

  }

  getSubProjectList(projectId: string): Observable<any>{
    const url = this.BaseUrl+'\\Timesheet\\GetSubProjectList?CompanyId='+this.CompanyId+'&ProjectId='+projectId;
    return this.http.get(url, {headers: this.httpHeaders})
  }

  getEmploy(empId: String): Observable<any>{
    const url = this.BaseUrl+'\\Employee\\oneEmployeeData?CompanyId='+this.CompanyId+'&empId='+empId;
    return this.http.get(url, {headers: this.httpHeaders})
  }

  
}
