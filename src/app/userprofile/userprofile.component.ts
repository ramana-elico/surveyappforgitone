import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private service:UserserviceService) { }

//variables are used for PROFILE
profile:any[]=[];

//variables for EDIT THE PROFILE
ProfileobjectID:any;
EmployeeID:any;
UserName:any;
Role:any;
Departments:any;
oldPassword:any;
newPassword:any;
succesmessage:any='';
profileafterediting:any[]=[];

  ngOnInit(): void {
    this.profile.length=0;
    this.profile=this.service.receiveprofilefromservice();
    this.EmployeeID=this.profile[0].EmployeeID;
    console.log(this.profile);
    

  }

  //chceking old password
  checkoldpassword(password){
    this.succesmessage='';
    console.log("checkeing",this.profile[0].Password)
    if(this.profile[0].Password!==password){
      this.succesmessage="Old Password Not Matched";
    }else{
      //contuine...
      this.succesmessage="Old Password Matched";
    }
  }


//used to EDIT THE PROFILE 
// editprofile(profile){
//   this.succesmessage='';
//   console.log(profile);
//   this.ProfileobjectID=profile._id;
//   this.EmployeeID=profile.EmployeeID;
//   this.UserName=profile.UserName;
//   this.Role=profile.Role;
//   this.Departments=profile.Departments;
//   this.Password=profile.Password;

// }

//==> saving edited PROFILE INTO DATABASE BASED ON OBJECTID
modalsucessmessage:any;
saveeditedprofile(){
  this.succesmessage=""
  if(this.profile[0].Password===this.newPassword){
    this.modalsucessmessage="Old Password and New Password Should Not Match";
  }
  else if(this.newPassword===''||this.newPassword===undefined||this.newPassword===null){
    this.modalsucessmessage="Please Enter Password !!"
  }else{
  this.ProfileobjectID=this.profile[0]._id;
this.profileafterediting.length=0;
this.profileafterediting.push({"_id":this.ProfileobjectID,"Password":this.newPassword})
console.log("wait!!!")
this.service.saveeditedprofile(this.profileafterediting).subscribe(res=>{
  console.log(res);
  if(res.message){
    this.modalsucessmessage=res.message;

    // //Recalling the profile for view in Table
    //  this.service.recallingtheprofile(this.profileafterediting).subscribe(res=>{
    //   if(res){
    //     this.profile.length=0;
    //   this.profile=res.profile;
    //   }
    //  })

  }
})


}

}
}
