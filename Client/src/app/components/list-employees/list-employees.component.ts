import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import {EmployeesService} from '../../services/employees.service';
import {Message} from '../../models/message'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees  : Employee [];
  message : Message;

  constructor(private employee_service : EmployeesService) {
    this.employees = new Array();
    this.message = new Message();
    this.clearMessage();
   }

   clearMessage() : void {
     this.message.message='';
   }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employee_service.getEmployees().subscribe(
      res => {
        this.employees = JSON.parse( JSON.stringify(res) );
      },
      error => console.log(error)
    );
  }

  deleteEmployee(id : string) {
    this.employee_service.deleteEmployee(id).subscribe(
      res => {
        this.message = JSON.parse( JSON.stringify(res) );
        this.getEmployees();
      },
      error => console.log(error)
    );
  }



}
