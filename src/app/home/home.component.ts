import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router:Router,private service:AdminserviceService,private userservice:UserserviceService) { }

  //login variables
  credintials:any[]=[];
  EmployeeId:any="";
  Password:any="";
  modalopen:boolean=false;
  
  button:boolean=false;
  Errormessage:any;
  Loadingoption:boolean=false;
  hidelogin:boolean=true;
  ngOnInit(): void {
  }

successmessage:any;
access:any;
  //the login method is used to send the user credintials to database and based on responce the next page will open
  
      
  login(){

    var modal = document.getElementById("myModalforlogin");
 

    console.log("login")
    this.Loadingoption=true;
    if((this.EmployeeId==="" ||this.EmployeeId===undefined || this.EmployeeId===null) && (this.Password==="" ||this.Password===undefined || this.Password===null)){
      this.successmessage="Please Enter Login Credentials !!";
      this.Loadingoption=false;
      //this.modalopen=true;
      modal.style.display = "block";

    }
    else if(this.EmployeeId==="" ||this.EmployeeId===undefined || this.EmployeeId===null)
    {
    this.successmessage="Please Enter Employee Id !!";
    this.Loadingoption=false;
    //this.modalopen=true;
    modal.style.display = "block";
    
    }
    else if(this.Password==="" ||this.Password===undefined || this.Password===null)
    {
    this.successmessage="Please Enter Password !!";
    this.Loadingoption=false;
    //this.modalopen=true;
    modal.style.display = "block";
    }else{
    /// this.successmessage="Please Wait !!";
    this.Loadingoption=true;
    /// this.modalopen=true;
    
    
    this.credintials.length=0;
    this.credintials.push({"EmployeeId":this.EmployeeId,"Password":this.Password});
    
    
    
    //COMPARING CREDINTIALS WITH DATABASE
    this.service.login(this.credintials).subscribe(res=>{
    this.Loadingoption=true;
    
    
    console.log(res);
    if(res.response.length===0)
    {
    this.successmessage="Please Enter Valid EmployeeId !!";
    this.Loadingoption=false;
    modal.style.display = "block";
    }
    else if(res.response[0].Password !==this.Password){
      this.successmessage="Please Enter Valid Password !!";
      this.Loadingoption=false;
      modal.style.display = "block";
    }
    else if(res.response[0].Password === 'Access#123')
    {
    
    this.router.navigate(['/changepassword']);
    this.service.sendprofiletoadmin(res.response);
    }
    else{
    if(res.response[0].Role==='Admin')
    {
    //Senindg user CREDINTIALS TO PROFILE to admin
    this.router.navigate(['/adminhome']);
    this.service.sendprofiletoadmin(res.response);
    }
    else if(res.response[0].Role==='User')
    {
    this.router.navigate(['/userhome']);
    //Senindg user CREDINTIALS TO PROFILE to user
    this.userservice.sendprofiletouser(res.response);
    }else{
    //contune
    }
    }
    });
    
    
    
    
    }
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


















      //this.modalopen=false;
      // login(){
    
      //   console.log("login")
      //   this.Loadingoption=true;
      //   if(this.EmployeeId==="" ||this.EmployeeId===undefined || this.EmployeeId===null)
      //   {
      //     this.successmessage="Please Enter EmployeeId !!";
      //     this.Loadingoption=false;
      //     this.modalopen=true;
      
      //   }
      //   else if(this.Password==="" ||this.Password===undefined || this.Password===null)
      //   {
      //     this.successmessage="Please Enter Password !!";
      //     this.Loadingoption=false;
      //     this.modalopen=true;
      //   }else{
      //     this.successmessage="Please Wait !!";
      //     this.Loadingoption=true;
      //     this.modalopen=true;
    
    
      //   this.credintials.length=0;
      //   this.credintials.push({"EmployeeId":this.EmployeeId,"Password":this.Password});
        
    
    
      //   //COMPARING CREDINTIALS WITH DATABASE
      //   this.service.login(this.credintials).subscribe(res=>{
      //     this.Loadingoption=true;
    
    
      //     console.log(res);
      //     if(res.response.length===0)
      //        {
      //         this.successmessage="Credintials MissMatched !!";
      //         this.modalopen=true;
      //        }
      //     else if(res.response[0].Password === 'Access#123')
      //     {
    
      //       this.router.navigate(['/changepassword']);
      //       this.service.sendprofiletoadmin(res.response);
      //     }   
      //    else{     
      //                 if(res.response[0].Role==='Admin')
      //                 {
      //                 //Senindg user CREDINTIALS TO PROFILE to admin
      //                   this.router.navigate(['/adminhome']);
      //                   this.service.sendprofiletoadmin(res.response);
      //                 }
      //                 else if(res.response[0].Role==='User')
      //                 {
      //                   this.router.navigate(['/userhome']);
      //                   //Senindg user CREDINTIALS TO PROFILE to user
      //                   this.userservice.sendprofiletouser(res.response);
      //                 }else{
      //                   //contune
      //                 }
      //        }
      //   });
    
    
    
    
      // }
      //     }







///=============> forgot password <================================
responseofOTP:any;
responseofOTP1:any;
responseofOTPdivision:boolean=false;
responseofNewPassworddivision:boolean=false;
responseofemaildivision:boolean=true;
/*Here we can generate otp for forgot password users and send that otp to his mail*/
generateNewPassword(email)
{
  let emailAndOtp:any=[];
  console.log("email",email);
  // Declare a digits variable  
  // which stores all digits 
  var digits = '0123456789'; 
  let OTP = ''; 
  for (let i = 0; i < 6; i++ ) { 
      OTP += digits[Math.floor(Math.random() * 10)]; 
  } 
  console.log("email",OTP);
  emailAndOtp.length=0;
  emailAndOtp.push({"email":email,"otp":OTP});
  this.service.generateAndSendNewPasswordToMail(emailAndOtp).subscribe(res=>{
    this.responseofOTP = res;
    console.log("res",this.responseofOTP);
    //console.log("res",this.responseofOTP['message']);
    
    if(this.responseofOTP['message'] === 'OTP Generated'){this.responseofOTP1 ="Please Check Your Mail For OTP";this.responseofOTPdivision = true;this.responseofemaildivision=false;}
    else if(this.responseofOTP['message'] === 'User not found'){this.responseofOTP1 ="Please Enter Valid Mail Id";this.responseofOTPdivision = false;this.responseofemaildivision=true;}
  } )
    
};
/*End of Here we can generate otp for forgot password users and send that otp to his mail*/

/*with reference of OTP we are replacing the existing password with new pass word*/
otpinput:any;
newPassword:any;
otpforPaswordChange:any;
checkOTP(otp)
{
  console.log("otp,newPassword",otp);
  this.otpforPaswordChange = otp;
  let otpcheck:any=[];
  otpcheck.length=0;
  otpcheck.push({"otp":otp});
  this.service.checkWithotp(otpcheck).subscribe(res=>{
    console.log("res",res);
    
    if(res['message'] === 'OTP Not Found'){this.responseofOTP1 ="";this.responseofOTP1 ="OTP Not Matched";}
    else if(res.response[0].OTP === otp){this.responseofOTP1 ="";
    this.responseofOTP1 ="OTP Matched";
    this.responseofNewPassworddivision = true;
    this.responseofOTPdivision = false;this.responseofemaildivision=false;
  }
    else{this.responseofOTP1 ="OTP Not Matched";}

  })
    
};
replaceNewPassword()
{
  this.newPassword;
  console.log("otp,newPassword",this.otpforPaswordChange,this.newPassword);
  let otpAndNewpassword:any=[];
  otpAndNewpassword.length=0;
  otpAndNewpassword.push({"otp":this.otpforPaswordChange,"newPassword":this.newPassword});
  
  this.service.replaceWithNewPassword(otpAndNewpassword).subscribe(res=>{
    console.log("res",res);
    if(res['message'] === 'Password Updated'){this.responseofOTP1 ="";this.responseofOTP1 ="Password Updated Successfully";}
    else{this.responseofOTP1 ="Password Not Updated";}

  })
    
};
/*End of with reference of OTP we are replacing the existing password with new pass word*/


// variable
show: boolean = false;


   


// click event function toggle
showpassword() {
    this.show = !this.show;
}






}
