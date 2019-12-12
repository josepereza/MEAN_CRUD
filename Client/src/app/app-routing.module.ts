import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEmployeeComponent} from './components/create-employee/create-employee.component';
import {ListEmployeesComponent} from './components/list-employees/list-employees.component';




const routes: Routes = [
  {path:'' , redirectTo : '/employees' , pathMatch : 'full'},
  {path:'employees/add', component:CreateEmployeeComponent},
  {path:'employees', component:ListEmployeesComponent},
  {path:'employees/edit/:id', component:CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
