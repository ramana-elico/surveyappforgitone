import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrls: ['./takesurvey.component.css']
})
export class TakesurveyComponent implements OnInit {

  constructor(private service:UserserviceService) { }
  //profile section variables
  profile:any[]=[];
  userdepartment:any;


  //variables used to testname
  testnametogetsurvey:any;

  //testnames 
  testnamelist:any[]=[];
  testname:any;


  ngOnInit(): void {
    this.profile.length=0;
    this.profile=this.service.receiveprofilefromservice();
    console.log("profile",this.profile);
   //Getting Testnames assigned to department
   this.service.getassignedtestnames(this.profile).subscribe(res=>{
     console.log(res);
     if(res.message){
       this.testnamelist.length=0;

       this.testnamelist=res.testnames;

     }
   });



  }
  responsefromuser;
  p:any;
showchoosetheoptions:boolean=true;
showfilltheblanks:boolean=false;
checked=true;

//getting survey
  questionsfromadmin:any[]=[];

  afterfillingsurvey:any[]=[];
  answeer:any;

  questionfromadminfilltype:any[]=[{"testname":"Test1","Question":"What is your company"},{"testname":"Test1","Question":"What is your location"},
  {"testname":"Test1","Question":"What is your location"},
  {"testname":"Test1","Question":"What is your location"},
]

multiple(ID,res){

     if(!ID.response){ID.response = res;}
      else if(ID.response){ID.response=0;ID.response = res;}
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


  fillintheblank(ID,res){
    if(!ID.response){ID.response = res;}
    else if(ID.response){ID.response=0;ID.response = res;}

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

successmessage:any;
  sendresponse(){

if(this.vaildations!==this.afterfillingsurvey.length){
  document.getElementById('success').style.color="red";
  this.successmessage="Please Fill The Survey Completely !! ";
}
else{
  this.successmessage="Please Wait !!";
  console.log("user answer==>",this.afterfillingsurvey);
 
  //Adding the userID to OBJECT ID because of avoiding duplicates problem in database..
  for(let i=0;i<this.afterfillingsurvey.length;i++){
    this.afterfillingsurvey[i]._id=this.profile[0].EmployeeID+this.afterfillingsurvey[i]._id;
    
 }
    this.service.submitsurvey(this.afterfillingsurvey).subscribe(res=>{
      console.log(res);
      if(res.message==='Survey submitted Successfully'){
                  document.getElementById('success').style.color="green";
                  this.successmessage=res.message;
                  this.hidesavebutton=false;
                    this.questionfromadminfilltype.length=0;
                    this.afterfillingsurvey.length=0;
                    this.testnametogetsurvey="";
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



//the below methods are for show and choose options
// showchooseoptions(){
//   this.showchoosetheoptions=true;
//   this.showfilltheblanks=false;
// }

// showfillblanks(){
//   this.showchoosetheoptions=false;
//   this.showfilltheblanks=true;
//   this.checked=false;
// }



///getting survey based on testname
gettingsurvey:any[]=[];
hidesavebutton:boolean=false;
vaildations:any=0;
message:any;
getsurvey(){
  console.log(this.testnametogetsurvey);
  this.message="";
  
  let seperating:string[] = this.testnametogetsurvey.split('-');
  let seperating1:any[] =[];
  for(let i=0; i<this.testnametogetsurvey.length;i++){
   
    seperating1.push(seperating[i]);
    break;
  };

  console.log(seperating1[0]);

  
  // console.log(seperating1)
  //console.log(seperating.push(this.testnametogetsurvey))
  console.log(this.testnametogetsurvey)
  this.gettingsurvey.length=0;
  this.afterfillingsurvey.length=0;
  
  this.gettingsurvey.push({"testName":seperating1[0]});

  //getting survey based on testname
  this.service.gettingsurvey(this.gettingsurvey).subscribe(res=>{
    console.log(res);
    if(res.survey.length!==0){

            
              this.questionsfromadmin=res.survey;
              this.testname=this.questionsfromadmin[0].testName;
              this.vaildations=this.questionsfromadmin.length;
              this.testname=this.testname.toUpperCase();
              this.hidesavebutton=true;
    }else{
      this.message="Not data Found on Particular Testname !!"
      this.hidesavebutton=false;
    }
  })

}






}
