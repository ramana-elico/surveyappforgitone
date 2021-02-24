import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private adminservice:AdminserviceService,private router:Router) { }

  //variables are used for PROFILE
  profile:any[]=[];
  changepasswordmodal:boolean=false;
  //variables for EDIT THE PROFILE
  ProfileobjectID:any;
  EmployeeID:any;
  UserName:any;
  Role:any;
  Departments:any;
  oldPassword:any;
  oldPasswordvalue:any;
  newPassword:any;
  succesmessage:any='';
  profileafterediting:any[]=[];
  
    ngOnInit(): void {
      this.profile.length=0;
      this.profile=this.adminservice.receiveprofilefromservice();
      this.EmployeeID=this.profile[0].EmployeeID;
      console.log(this.profile);
      
  
    }
  
    //chceking old password
    checkoldpassword(password){
      this.succesmessage='';
      console.log("checkeing",this.profile[0].Password);
      if(password === '' || password === undefined)
        {
          this.succesmessage="Please Enter Old Password";
        }
         
      else if(this.profile[0].Password!==password){
        this.succesmessage="Old Password Not Matched";
        this.changepasswordmodal=true;
      }else{
        //contuine...
        this.succesmessage="Old Password Matched";
      }
    }
  
  

  
  //==> saving edited PROFILE INTO DATABASE BASED ON OBJECTID
  modalsucessmessage:any;
  saveeditedprofile(){
    this.succesmessage=""
    if(this.oldPasswordvalue === '' || this.oldPasswordvalue === undefined ||this.oldPasswordvalue===null)
    {
      this.succesmessage="Please Enter Old Password";
      this.modalsucessmessage="Please Enter Old Password";
    }
    else if(this.profile[0].Password===this.newPassword){
      this.modalsucessmessage="Old Password and New Password Should Not Match";
    }
    else if(this.newPassword===''||this.newPassword===undefined||this.newPassword===null){
      this.modalsucessmessage="Please Enter Password !!"
    }else{
      this.modalsucessmessage="Please Wait !! ";
    this.ProfileobjectID=this.profile[0]._id;
  this.profileafterediting.length=0;
  this.profileafterediting.push({"_id":this.ProfileobjectID,"Password":this.newPassword})
  //console.log("wait!!!")
  this.adminservice.saveeditedprofile(this.profileafterediting).subscribe(res=>{
    console.log(res);
    if(res.message){
      this.modalsucessmessage =res.message;
  //this.router.navigate(['']);
      this.oldPasswordvalue = '';
      this.newPassword = '';
  
    }
  })
  
  
  }
  }
  

}
