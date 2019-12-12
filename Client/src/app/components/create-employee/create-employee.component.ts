import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Employee } from 'src/app/models/employee';
import {EmployeesService} from '../../services/employees.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee : Employee;
  message : Message;

  constructor(private employees_service : EmployeesService , private activatedRoute : ActivatedRoute) {
    this.employee = new Employee();
    this.message = new Message();
    this.clearEmployee();
    this.clearMessage();
  }

  ngOnInit() {
    let params : string = this.getParams();
    if (params) this.getEmployee(params);
  }

  getParams() : string  {
    return this.activatedRoute.snapshot.params.id;
  }

  clearEmployee() : void {
    this.employee.name='';
    this.employee.surname='';
    this.employee.document=null;
    this.employee.phone=null;
    this.employee.address='';
  }

  clearMessage() : void {
    this.message.message='';
    this.message.success=null;
  }

  insert() {
    this.employees_service.insertEmployee(this.employee).subscribe(
      res => {
        this.message = JSON.parse( JSON.stringify(res) );
        if (this.message.success) {
          this.clearEmployee();
        }
        else this.focus('document');
      },
      error => {
        console.log(error);
      }
    );
}

  getEmployee(id : string) {
    this.employees_service.getEmployee(id).subscribe(
      res => {
        this.employee = JSON.parse( JSON.stringify(res) );
        this.focus('name');
      },
      error => console.log(error)
    );
  }

  focus(id : string) : void {
    document.getElementById(id).focus();
  }

  updateEmployed(id : string) {
    this.employees_service.updateEmployee(id , this.employee).subscribe(
      res => {
        this.message = JSON.parse(JSON.stringify(res) )
      },
      error => console.log('error')
    );
  }

  insertOrEdit() {
    let params = this.activatedRoute.snapshot.params.id;
    if (params) this.updateEmployed(params);
    else this.insert();
  }

}
