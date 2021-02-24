import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pastsurvey',
  templateUrl: './pastsurvey.component.html',
  styleUrls: ['./pastsurvey.component.css']
})
export class PastsurveyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  responcefromUser:any[]=[{"Testname":"Testfromadmin","Question":"what is Your Company","responce":"Elico","UserId":"9746","department":"Software"},
  {"Testname":"Testfromadmin","Question":"what is Your Company","responce":"Elico","UserId":"9746","department":"Software"},
  {"Testname":"Testfromadmin","Question":"what is Your Company","responce":"Elico","UserId":"9746","department":"Software"},
  {"Testname":"Testfromadmin","Question":"what is Your Company","responce":"Elico","UserId":"9746","department":"Software"},
  {"Testname":"Testfromadmin","Question":"what is Your Company","responce":"Elico","UserId":"9746","department":"Software"}];

editpastsurvey:any=[];

  edittheresponse(response){
this.editpastsurvey=response;
console.log(this.editpastsurvey)
  }

}
