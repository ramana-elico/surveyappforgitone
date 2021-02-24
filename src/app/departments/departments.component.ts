import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor(private http:HttpClient,private service:AdminserviceService, private titlecasePipe:TitleCasePipe) { }
  p: number = 1;
  term;
  termforviewusers;

  ngOnInit(): void {
    // document.getElementById("button1").style.color="orange";
    //Below method is used to get all the departments 
    this.service.gettingdepartmentslist().subscribe(res=>{
      console.log("department list",res.departments);
      this.departmentslist.length=0;
      this.departmentslist=res.departments;
      this.departmentcount=this.departmentslist.length;
    });
  }

  showdepart:boolean=true;
  hidedepart:boolean=false;
  newdepartment:any;
  successmessage:any;
  

departmentslist:any[]=[];
departmentcount:any;

//below variables are used for editing the department
newdepartmentforedit:any;
departmentid:any;
departmentandidarray:any[]=[];

///below variables are sued for DELETE 
deletedepartmentarray:any[]=[];


//The below method is used to show the departmentlist page
showdepartments(){
this.showdepart=true;
this.hidedepart=false
// document.getElementById("button1").style.color="orange";
// document.getElementById("button2").style.color="white";

}

//The below method is used to show the create department page
showcreatedepartment(){
  this.showdepart=false;
  this.hidedepart=true;
  this.successmessage='';
  // document.getElementById("button2").style.color="orange";
  // document.getElementById("button1").style.color="white";
}


//The below method is used to save the department into database 
newdepartmentarray:any[]=[];

createdepartment(){
  this.successmessage="";
  if(this.newdepartment===''||this.newdepartment===undefined||this.newdepartment===null)
  {
    this.successmessage="Please Enter Department !!";
  }
  else{
    this.successmessage="Please Wait !!";
    this.newdepartment = this.titlecasePipe.transform(this.newdepartment);
  //this.newdepartment=this.newdepartment.toLowerCase( );
  //Checking the new department whelther avilable in db or not
for(let i=0;i<this.departmentslist.length;i++){
if(this.newdepartment!==this.departmentslist[i].department){
  
}else{
var duplicate="yes";
}

}

if(duplicate==="yes"){
  this.successmessage="Department Already Exists !!";
}else{
  this.newdepartment = this.titlecasePipe.transform(this.newdepartment);
  //this.newdepartment=this.newdepartment.toLowerCase( );
  this.newdepartmentarray.length=0;
  this.newdepartmentarray.push({"department":this.newdepartment});
  this.service.createnewdepartment(this.newdepartmentarray).subscribe(res=>{
    console.log(res);
    if(res){
      this.successmessage=res.message;
      //Getting department list after created new department
      this.service.gettingdepartmentslist().subscribe(res=>{
        this.departmentslist=res.departments;
        this.departmentcount=this.departmentslist.length;
      });
    }else{
      this.successmessage="Something went wrong !!"
    }
  });
  this.newdepartmentarray.length=0;
  setTimeout(() => {
    this.newdepartment='';
  }, 3000);
  
}

}


}

//========== EDITING OF DEPARTMENT========
editdepartments(department){
  document.getElementById("editdepartment").style.borderColor="black";
this.newdepartmentforedit=department.department;
this.departmentid=department._id;
this.successmessage='';
}


///======== Saving editing department into database..
saveediteddeprtment(){
  this.successmessage="";
  this.departmentandidarray.length=0;
  this.newdepartmentforedit = this.titlecasePipe.transform(this.newdepartmentforedit);
  //this.newdepartmentforedit=this.newdepartmentforedit.toLowerCase( );
  this.departmentandidarray.push({"department":this.newdepartmentforedit,"_id":this.departmentid});
  //checking the duplicates from database
  for(let i=0;i<this.departmentslist.length;i++){
    if(this.departmentslist[i].department===this.departmentandidarray[0].department){
          var duplicate="Found";
    }else{
//continue...
    }

  }
  if(duplicate==="Found"){
    this.successmessage="Department Already Exists !!";
    document.getElementById("editdepartment").style.borderColor="red";
  }else{
    document.getElementById("editdepartment").style.borderColor="green";
   //SAVING INTO DATABASE
   this.service.saveediteddeprtment(this.departmentandidarray).subscribe(res=>{
    console.log(res);
    if(res.message){
      this.successmessage=res.message;

      //RECALLING THE ALL THE DEPARTMENTS IN DATABASE
      this.service.gettingdepartmentslist().subscribe(res=>{
        console.log("department list",res.departments);
        this.departmentslist.length=0;
        this.departmentslist=res.departments;
        this.departmentcount=this.departmentslist.length;
      });
    }
   });
  }

}



//ALERT MESSAGE FOR DELETE 

departmentfordelete:any={};
alertfordeletedepartment(department){
  
  this.departmentfordelete=department;
  console.log(this.departmentfordelete);
  
}



//====   DELETE OF DEPARTMENT   =====
deletedepartment(departmentid){
  console.log(departmentid);
  this.deletedepartmentarray.length=0;
  this.deletedepartmentarray.push(departmentid);
  //DELETE CODE STARTS
  this.service.deletedepartment(this.deletedepartmentarray).subscribe(res=>{
    if(res.message){
      console.log(res);
            //RECALLING THE ALL THE DEPARTMENTS IN DATABASE
            this.service.gettingdepartmentslist().subscribe(res=>{
              console.log("department list",res.departments);
              this.departmentslist.length=0;
              this.departmentslist=res.departments;
              this.departmentcount=this.departmentslist.length;
            });
    }
  })
}







/////Viewving the avilable users in particular DEPARTMENT
viewlistarray:any[]=[];
availableuser:any[]=[];
messageerror:any;

viewoveralluserslist(department){
  this.messageerror='';
  console.log(department);
  this.viewlistarray.length=0;
  this.viewlistarray.push({"Departments":department});
  this.service.viewuserlistbydepartment(this.viewlistarray).subscribe(res=>{
    console.log(res);
    if(res){
      
      this.availableuser.length=0;
      this.availableuser=res.usersbydepartment;
      if(this.availableuser.length===0){
        this.messageerror="No Users Found on Selected Department !!"
      }else{
        //contuine..
      }
    }
  })
}

///below variables are used for DELETE users avilable in department

deleteavailableusersarray:any=[];
availableuserscount:any;


///delete all the available users in particular department starts from here

userdetails:any={};
deleteavailableusers(availableusersid){
this.userdetails=availableusersid;

}

deleteuser(user){
  this.deleteavailableusersarray.length=0;
  this.deleteavailableusersarray.push(user);

  this.service.delete(this.deleteavailableusersarray).subscribe(res=>{
    if(res){
      console.log("delete",res);
      this.service.viewuserlistbydepartment(this.viewlistarray).subscribe(res=>{
        console.log(res);
        if(res){
          
          this.availableuser.length=0;
          this.availableuser=res.usersbydepartment;
          if(this.availableuser.length===0){
            this.messageerror="No Users Found on Selected Department !!"
          }else{
            //contuine..
          }
        }
      })
    }
  });
}
///delete all the available users in particular department Ends from here


}
