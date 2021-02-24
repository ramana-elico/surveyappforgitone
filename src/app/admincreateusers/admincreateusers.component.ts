import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-admincreateusers',
  templateUrl: './admincreateusers.component.html',
  styleUrls: ['./admincreateusers.component.css']
})
export class AdmincreateusersComponent implements OnInit {

  constructor(private service:AdminserviceService) { }

  ngOnInit(): void {
    this.service.gettingdepartmentslist().subscribe(res=>{
      console.log("department list",res.departments);
      this.departmentslist.length=0;
      this.departmentslist=res.departments;

    });
  }

//used for getting deaprtment for dropdown
departmentslist:any[]=[];


  //below variables are used for pagenation and search term
  p: number = 1;
  term;


  //below variables are used for creating account
  
  usercredintials:any[]=[];

  //below variables are used for getting user list
  UsersList:any[]=[];
  successmesage:any="Employee ID Already exists !!";
  successmessageafteredit:any='';
  userlistlength:any;

  //variables are used for editing the user details
  userdataarray:any[]=[];
  objectID:any;
  employeeIDforedit:any;
  usernameforedit:any;
  emailIDforedit:any;
  passwordforedit:any;
  roleforedit:any;
  departmentforedit:any;

//The Below method is sued to select the role
selectrole(role){
  console.log(role);
   this.role=role;
}


//The Below method is used to select departments
selectdepartment(department){
console.log(department);
this.department=department;
}


id:any;


//cheking the employee id is present or not in db 
uniqueemployeeid(id){
  this.successmesage='';
  var modal = document.getElementById("myModalforlogin");
//getting all  the employee id to check the dupliacte
this.service.getallusers().subscribe(res=>{
    if(res){
    console.log(res.usercreationlist);

    for(let i=0;i<res.usercreationlist.length;i++){
      if(res.usercreationlist[i].EmployeeID===id){
        this.successmesage="Employee ID Already exists !!"
        modal.style.display = "block";
      }else{
        //contuine..

      }
    }

  }
});

}






//The below method is used to create an account to user in database.
EmployeeID:any;
EmailID:any;
UserName:any
defaultpassword="Access#123";
role:any;
department:any;

createaccount(){

  
  var modal = document.getElementById("myModalforlogin");



  if(this.EmployeeID==="" ||this.EmployeeID===undefined||this.EmployeeID===null){
    this.successmesage="please Enter EmployeeID !!";
    modal.style.display = "block";
  }
  else if(this.EmailID==="" ||this.EmailID===undefined||this.EmailID===null){
    this.successmesage="Please Enter EmailID !!"
    modal.style.display = "block";
  }
  else if(this.UserName==="" ||this.UserName===undefined||this.UserName===null){
    this.successmesage="Please Enter UserName !!"
    modal.style.display = "block";
  }else if(this.department==="" || this.department===undefined){
    this.successmesage="Please Select Department !!";
    modal.style.display = "block";
  }
  else if(this.role==="" || this.role===undefined){
    this.successmesage="Please Select Role !!";
    modal.style.display = "block";
  }else{


    console.log("this.department",this.department);
    console.log("this.role",this.role);
    
  this.successmesage="please Wait";
this.usercredintials.length=0;
this.usercredintials.push({"EmployeeID":this.EmployeeID,"EmailID":this.EmailID,"OTP":"NULL","UserName":this.UserName,"Password":this.defaultpassword,"Role":this.role,"Departments":this.department})

this.service.createaccount(this.usercredintials).subscribe(res=>{
  console.log(res);
  if(res){
    this.successmesage=res.message;
    modal.style.display = "block";
    //clearing all the data
                this.EmployeeID="";
                this.EmailID="";
                this.UserName='';
                this.role="";
                this.department="";
  }
})
  }
}


clear(){
  this.EmployeeID="";
  this.EmailID="";
  this.UserName='';
  this.role="";
  this.department="";
}



close(){

  var modal = document.getElementById("myModalforlogin");

  modal.style.display = "none";


// When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


}











//The Below method is used for getting all the users list avilable in database
getallusers(){
  //this.successmesage="";
  console.log("gettting data");
  this.service.getallusers().subscribe(res=>{
    console.log(res);
    if(res){
      this.UsersList.length=0;
      this.UsersList=res.usercreationlist;
      this.userlistlength=this.UsersList.length;

    }
  });
} 


//=======> EDIT USER DETAILS <=======
edituserdata(userdata){
  console.log(userdata);
  this.successmessageafteredit='';
  this.objectID=userdata._id;
  this.employeeIDforedit=userdata.EmployeeID;
  this.emailIDforedit=userdata.EmailID;
  this.usernameforedit=userdata.UserName;
  this.passwordforedit=userdata.Password;
  this.roleforedit=userdata.Role;
  this.departmentforedit=userdata.Departments;
 
}

//Edit select department
editselectdepartment(department){
  // console.log(value);
  this.departmentforedit=department;
}

//Edit select role
editselectrole(role){
  this.roleforedit=role;

}


//Below method is used to SAVE THE EDITED USER PROFILE
saveediteduserdata(){
 this.userdataarray.length=0;
  this.userdataarray.push({"_id":this.objectID,"EmployeeID":this.employeeIDforedit,"EmailID":this.emailIDforedit,"UserName":this.usernameforedit,"Password":this.passwordforedit,"Role":this.roleforedit,"Department":this.departmentforedit});
console.log(this.userdataarray);

//Saving Edited users list into database....
this.service.saveediteduserdata(this.userdataarray).subscribe(res=>{
  console.log(res);
  if(res.message==='User Details Updated Successfully !!'){
    this.successmessageafteredit=res.message;

    //retriving the User list in get applicats sections
    this.service.getallusers().subscribe(res=>{
      console.log(res);
      if(res){
        this.UsersList.length=0;
        this.UsersList=res.usercreationlist;
        this.userlistlength=this.UsersList.length;
  
      }
    });





  }
});


}


//ALERT MESSAGE FOR DELETE 

userfordelete:any={};
alertfordelete(userprofile){
  
  this.userfordelete=userprofile;
  console.log(this.userfordelete);
  
}




//DELETE THE USER
delete(userid){
  this.userdataarray.length=0;
  this.userdataarray.push(userid);

  this.service.delete(this.userdataarray).subscribe(res=>{
    if(res){
      console.log("delete",res);
      this.service.getallusers().subscribe(res=>{
        console.log(res);
        if(res){
          this.UsersList.length=0;
          this.UsersList=res.usercreationlist;
          this.userlistlength=this.UsersList.length;
    
        }
      });
    }
  })

}



}
