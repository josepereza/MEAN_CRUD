import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  api_uri : string ='http://localhost:3000/api/employees';

  constructor(private http : HttpClient) {

  }

  getEmployees() {
    return this.http.get(this.api_uri);
  }

  getEmployee(id : string) {
    return this.http.get(`${this.api_uri}/${id}`);
  }

  insertEmployee(employee : Employee) {
    return this.http.post(this.api_uri , employee);
  }

  deleteEmployee(id : string) {
    return this.http.delete(`${this.api_uri}/${id}`);
  }

  updateEmployee(id : string , updatedEmployee : Employee)  {
    return this.http.put(`${this.api_uri}/${id}`, updatedEmployee);
  }
}
