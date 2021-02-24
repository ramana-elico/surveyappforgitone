import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { UserserviceService } from '../userservice.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private service:UserserviceService) { }
  b:boolean=true;
  tm:number=1;
  tn:number=1;
  ts:number=1;
  p:number=1;
  
 changepassword:boolean=false;
surveypage:boolean=true;

  //profile section variables
  profile:any[]=[];
  userdepartment:any;
  
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
  
  //variables used to testname
  testnametogetsurvey:any;
  
  //testnames 
  testnamelist:any[]=[];
  testname:any;
  
  
  
  questionsfromadmin:any[]=[];
  gettingsurvey:any[]=[];
  gettingsurvey1:any[]=[];
  hidesavebutton:boolean=false;
  vaildations:any=0;
  
  alertmessage:any;
  employeefilledresponse:any[]=[];
  testnameforfilledform:any;
  employeeidforfilledform:any;
  departmentforfilledform:any;
  
  firstdivclosing:boolean = true;
  seconddivclosing:boolean = false;
  //testnamelist:any[]=[];
    finaltestnames:any[]=[];
    completedsurveydupliactes:any[]=[]
    completedsurvey:any[]=[];
    testnamelistduplicates:any[]=[];
    messgae:any;
  
  afterfillingsurvey:any[]=[];
  questionfromadminfilltype:any[]=[{"testname":"Test1","Question":"What is your company"},{"testname":"Test1","Question":"What is your location"},
    {"testname":"Test1","Question":"What is your location"},
    {"testname":"Test1","Question":"What is your location"},
  ]
  
  fakearray:any[]=[];
  FilledDate:any;
  
    ngOnInit(): void {



      // const name="saikumar";
      // const captialname=name.charAt(0).toUpperCase()+name.slice(1);
      // console.log("captial name",captialname);
      console.log("profile",this.profile);
      this.profile.length=0;
      this.profile=this.service.receiveprofilefromservice();
      this.EmployeeID=this.profile[0].EmployeeID;
      
      
  

     //completed
     //getting completed survey 
     this.service.gettingcompletedsurvey(this.profile).subscribe(res=>{
      if(res.completedsurvey.length!==0){
        //console.log(res)
        this.completedsurvey=res.completedsurvey;
        this.completedsurveydupliactes= findElements(this.completedsurvey);

       //Duplicate Method
        function  findElements(array){
          var newArray=[];
          newArray[0]=array[0];
          for(var i=0;i<array.length;i++){
      var isexist=false;
      for(var j=0;j<newArray.length;j++){
      if(array[i].testName == newArray[j].testName){
      isexist=true;
      break;
      }
      else{
      isexist=false;
      }
      }
      if(isexist == false){
      newArray[newArray.length]=array[i];
      }
          }
          
          return newArray;
        }
          console.log("completedsurvey found ==>",this.completedsurveydupliactes);

      }else{
        this.messgae="no";
      }
    });
  
     
  
 setTimeout(() => {
     //Getting Testnames assigned to department
     this.service.getassignedtestnames(this.profile).subscribe(res=>{
      console.log(res);
      
      
      if(this.completedsurveydupliactes.length!==0){
        this.testnamelist.length=0;
        this.testnamelist=res.testnames;
        //console.log("testnames found ==>",this.testnamelist)
  
         
         for(let i=0;i<this.completedsurveydupliactes.length;i++){
  
           for(let k=0;k<this.testnamelist.length;k++){
              
             if(this.completedsurveydupliactes[i].testName === this.testnamelist[k].testName  ){
                this.testnamelist.splice(k,1)
 
             }else{
  
             }
           }
  
  
         }
         console.log("final testnames",this.testnamelist);
         console.log("this.testnamelist[i].Enddate.getDate()",new Date(this.testnamelist[0].Enddate).getTime());
            console.log("new Date().getDate()",new Date().getTime());
         for(let i=0; i<this.testnamelist.length; i++)
         {
          if(new Date(this.testnamelist[i].Enddate).getTime() < new Date().getTime())
          {
            
            this.testnamelist.splice(i,1);
          }
         }
         

     }
     else{
       console.log("testname list else condition==>");
       this.testnamelist.length=0;
       this.testnamelist=res.testnames;
       for(let i=0; i<this.testnamelist.length; i++)
         {
          if(new Date(this.testnamelist[i].Enddate).getTime() < new Date().getTime())
          {
            
            this.testnamelist.splice(i,1);
          }
         }
     }
    });
 }, 1000);



  
    
 







  
  
    } //End of ng oninit




    showchangepassword(){

      this.surveypage=false;
      this.changepassword=true;
    }

    backtosurvey(){
      this.surveypage=true;
      this.changepassword=false;
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
  
  
    thirddivclosing = false;
    /* getting the survey form to check the form*/
    viewoverallsurveyform(testName)
    {
          this.firstdivclosing = false;
          this.thirddivclosing = true;
          console.log("testName",testName);
          this.gettingsurvey1.length=0;
          this.gettingsurvey1.push({"testName":testName,"EmployeeID":this.profile[0].EmployeeID});
          //getting survey based on testname
        this.service.gettingcompletedsurveyform(this.gettingsurvey1).subscribe(res=>{
          console.log(res);
          console.log(res.message);
          
          if(res){
            if(res.survey.length===0){
              this.alertmessage="No Data Found On selected User!!!"
            }else{
            this.employeefilledresponse.length=0;
            this.employeefilledresponse=res.survey;
            this.testnameforfilledform=this.employeefilledresponse[0].testName.toUpperCase();
            this.employeeidforfilledform=this.employeefilledresponse[0].userid.toUpperCase();
            this.departmentforfilledform=this.employeefilledresponse[0].department.toUpperCase();
          }
          }   
        })
  
    }
    /* End of getting the survey form to check the form*/
  
    /* getting the survey form to fill the form*/
    gettingtestname(testName)
    {
      console.log("testName",testName);
      this.gettingsurvey.length=0;
      this.gettingsurvey.push({"testName":testName,"EmployeeID":this.profile[0].EmployeeID});
      //getting survey based on testname
    this.service.gettingsurvey(this.gettingsurvey).subscribe(res=>{
      console.log(res);
      console.log(res.message);
      if(res.message === "survey Found"){
                this.questionsfromadmin=res.survey;
                this.testname=this.questionsfromadmin[0].testName;
                this.vaildations=this.questionsfromadmin.length;
                this.testname=this.testname.toUpperCase();
                this.hidesavebutton=true;
                this.firstdivclosing = false;
                this.seconddivclosing = true;
      }    
    })
  
    }
    /* End of getting the survey form to fill the form*/
  
    /* this gobackToHome method useful to go back to user home page*/
    gobackToHome()
    {
      this.firstdivclosing = true;
      this.seconddivclosing = false;
      this.thirddivclosing = false;
    }
    /* End of this gobackToHome method useful to go back to user home page*/
  
    /*this is  sendresponse*/
    successmessage:any;
    sendresponse(){
  
  if(this.vaildations!==this.afterfillingsurvey.length){

    this.successmessage="Please Fill The Survey Completely !! ";
  }
  else{
    this.successmessage="Please Wait !!";
    console.log("user answer==>",this.afterfillingsurvey);
      //DATE SAVING IN DATABASE   
  let today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
  console.log("date==>",today);
  this.FilledDate=today;
  
    //Adding the userID to OBJECT ID because of avoiding duplicates problem in database..
    for(let i=0;i<this.afterfillingsurvey.length;i++){
      this.afterfillingsurvey[i]._id=this.profile[0].EmployeeID+this.afterfillingsurvey[i]._id;
      this.afterfillingsurvey[i].FilledDate=this.FilledDate;
      
   }

   //assending order of filled survey form saving start
 for(let assend=0; assend<this.afterfillingsurvey.length; assend++)
 {
   for(let secondassend=1; secondassend<this.afterfillingsurvey.length-assend; secondassend++)
   {
     console.log("this.afterfillingsurvey[secondassend].serialnumber",this.afterfillingsurvey[secondassend].serialnumber);
    if(this.afterfillingsurvey[secondassend-1].serialnumber>this.afterfillingsurvey[secondassend].serialnumber)
    {
      let temp = this.afterfillingsurvey[secondassend];
      this.afterfillingsurvey[secondassend] = this.afterfillingsurvey[secondassend-1];
      this.afterfillingsurvey[secondassend-1] = temp;
    }
   }

 }
 for(let thirdassend=0; thirdassend<this.afterfillingsurvey.length ;thirdassend++)
 {
  this.afterfillingsurvey[thirdassend];
  console.log("this.afterfillingsurvey[thirdassend];269",this.afterfillingsurvey[thirdassend]);
 }
 console.log("this.afterfillingsurvey[thirdassend];271",this.afterfillingsurvey);
 
 //assending order of filled survey form saving end
 
      this.service.submitsurvey(this.afterfillingsurvey).subscribe(res=>{
        console.log(res);
        if(res.message==='Survey Submitted Successfully'){

                    this.successmessage=res.message;
                    this.hidesavebutton=false;
                      this.questionfromadminfilltype.length=0;
                      this.afterfillingsurvey.length=0;
                      this.testnametogetsurvey="";
                      
  

                      //from ng oninit
                      //getting completed survey 
                      this.service.gettingcompletedsurvey(this.profile).subscribe(res=>{
                        if(res.completedsurvey.length!==0){
                          //console.log(res)
                          this.completedsurvey=res.completedsurvey;
                          this.completedsurveydupliactes= findElements(this.completedsurvey);




                          //Duplicate Method
                          function  findElements(array){
                            var newArray=[];
                            newArray[0]=array[0];
                            for(var i=0;i<array.length;i++){
                        var isexist=false;
                        for(var j=0;j<newArray.length;j++){
                        if(array[i].testName == newArray[j].testName){
                        isexist=true;
                        break;
                        }
                        else{
                        isexist=false;
                        }
                        }
                        if(isexist == false){
                        newArray[newArray.length]=array[i];
                        }
                            }
                            
                            return newArray;
                          }
                            console.log("completedsurvey found ==>",this.completedsurveydupliactes);
                        }else{
                          this.messgae="no";
                        }
                      })
  
                      setTimeout(() => {
                        //Getting Testnames assigned to department
                        this.service.getassignedtestnames(this.profile).subscribe(res=>{
                         console.log(res);
                         
                         
                         if(this.completedsurveydupliactes.length!==0){
                           this.testnamelist.length=0;
                           this.testnamelist=res.testnames;
                           //console.log("testnames found ==>",this.testnamelist)
                     
                            
                            for(let i=0;i<this.completedsurveydupliactes.length;i++){
                     
                              for(let k=0;k<this.testnamelist.length;k++){
                                 
                                if(this.completedsurveydupliactes[i].testName === this.testnamelist[k].testName  ){
                                   this.testnamelist.splice(k,1)
                    
                                }else{
                     
                                }
                              }
                     
                     
                            }
                            console.log("final testnames",this.testnamelist);
                     
                        }
                        else{
                          console.log("testname list else condition==>");
                          this.testnamelist.length=0;
                          this.testnamelist=res.testnames;
                        }
                       });
                    }, 1000);
                      

        }else{
          document.getElementById('success').style.color="red";
          this.successmessage=res.message;
                    this.hidesavebutton=false;
                      this.questionfromadminfilltype.length=0;
                      this.afterfillingsurvey.length=0;
                      this.testnametogetsurvey="";
        }
      });
      
  
    }
    }
    /*End of this is  sendresponse*/
  
    /*multiple method */
    multiple(ID,res){
        
      if(!ID.response){
        ID.response = res;
      }
       else if(ID.response){
         ID.response=0;ID.response = res;
        }
      
      
      
     console.log("ID.response.length",ID.response);
     
     this.afterfillingsurvey.push(ID);
     for(let i=0;i<this.afterfillingsurvey.length;i++){
       if(ID._id===this.afterfillingsurvey[i]._id){
         this.afterfillingsurvey.splice(i);
         ID.userid=this.profile[0].EmployeeID;
         ID.department=this.profile[0].Departments;
         ID.status="completed";
         this.afterfillingsurvey.push(ID);
         
       }else{
         ID.userid=this.profile[0].EmployeeID;
         ID.department=this.profile[0].Departments;
         ID.status="completed";
         this.afterfillingsurvey.push(ID);
       }
  
     }
    
  
     
  
     console.log("responce from user==>",this.afterfillingsurvey);
     
   }
   /*multiple method */
  
   /* fillintheblank method*/
   fillintheblank(ID,res){
    


    if(!ID.response){ID.response = res;}
    else if(ID.response){ID.response=0;ID.response = res;}
  

    console.log(ID,res);
    if(ID.response==="" || ID.response===null || ID.response===undefined ){
      this.successmessage="Please Fill The Survey Completely !! ";
      for(let i=0;i<this.afterfillingsurvey.length;i++){
        if(ID._id===this.afterfillingsurvey[i]._id){
          this.afterfillingsurvey.splice(i,1);
        }
        }
    }
    else{

    this.afterfillingsurvey.push(ID);
    for(let i=0;i<this.afterfillingsurvey.length;i++){
      if(ID._id===this.afterfillingsurvey[i]._id){
        this.afterfillingsurvey.splice(i);
        ID.userid=this.profile[0].EmployeeID;
        ID.department=this.profile[0].Departments;
        ID.status="completed";
        this.afterfillingsurvey.push(ID);
        
      }else{
        ID.userid=this.profile[0].EmployeeID;
        ID.department=this.profile[0].Departments;
        ID.status="completed";
        this.afterfillingsurvey.push(ID);
      }
  
    }
    }
  
  
  }
  /* End of fillintheblank method*/
  


//change password code starts from here
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
this.ProfileobjectID=this.profile[0]._id;
this.profileafterediting.length=0;
this.profileafterediting.push({"_id":this.ProfileobjectID,"Password":this.newPassword})
console.log("wait!!!")
this.service.saveeditedprofile(this.profileafterediting).subscribe(res=>{
console.log(res);
if(res.message){
  this.modalsucessmessage=res.message;

  this.oldPasswordvalue = '';
    this.newPassword = '';

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



//change password code ends from here



  
  }
  