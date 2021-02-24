import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router:Router) { }
b:boolean=true;
  ngOnInit(): void {
  }

  hidesidenavbar(){
    document.getElementById("mySidenav").style.width = "0";
       //this.router.navigate(["/Departments"]);
       this.b=false;
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }




}
