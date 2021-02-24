import { Component, OnInit, ɵConsole } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-responsefrom-user',
  templateUrl: './responsefrom-user.component.html',
  styleUrls: ['./responsefrom-user.component.css']
})
export class ResponsefromUserComponent implements OnInit {

  constructor(private service:AdminserviceService) { }
  p: number = 1;
  term;




//Below variables are used for getting testnames from database
testnamelist:any[]=[];
testnamelistduplicate:any[]=[];
availabletestnamecount:any;
assigningtestnamerray:any[]=[];

//Below variables are used to getting department based on testname
testnametogetdepartment:any;
testnametogetdepartmentarray:any[]=[];
departmentlistbasedontestname:any[]=[];
departmentcountbasedontestname:any=0;



//variables are used to getting survey based on testname and department
departmenttogettingsurvey:any;
departmenttogettingsurveyarray:any[]=[];


//used to get testnames based on department
useridbasedondepartment:any;
useridbasedondepartmentarray:any[]=[];
userlistindepartment:any[]=[];
useridbasedondepartmentcount:any=0;

//variables used to getresponse
employeeidtogetresponse:any;
employeefilledresponse:any[]=[]; 
testname:any;
employeeid:any;
department:any;
employeeidarray:any[]=[];
alertmessage:any;


  ngOnInit(): void {
      //==GETTING TESTNAMES LIST====
      this.service.gettingtestnameslist().subscribe(res=>{
      
        if(res){
          this.testnamelist.length=0;
          this.testnamelist=res.gettingtestnameslist;
          console.log("getting testnames",this.testnamelist);

         this.testnamelistduplicate= findElements(this.testnamelist);
         this.availabletestnamecount=this.testnamelistduplicate.length;
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
         
        }else{
          //continue..
        }
    });




    
  }



  //==== Getting departments based on testname ======
  getdepartmentbasedontestname(){
    console.log(this.testnametogetdepartment);
this.testnametogetdepartmentarray.length=0;
this.testnametogetdepartmentarray.push({"testName":this.testnametogetdepartment.toLowerCase()});
//geting department codes starts
this.service.getdepartmentbasedontestname(this.testnametogetdepartmentarray).subscribe(res=>{
  console.log(res);
  if(res.message){
    this.departmentlistbasedontestname.length=0;
    this.departmentlistbasedontestname=res.departments;
    console.log(this.departmentlistbasedontestname);
    this.departmentcountbasedontestname=this.departmentlistbasedontestname.length;

  }
});

  }





//====> Below method is used to getting USERS based on department
  gettingusersbasedontestanddepartment(){

this.departmenttogettingsurveyarray.length=0;
this.departmenttogettingsurveyarray.push({"department":this.departmenttogettingsurvey})
console.log(this.departmenttogettingsurveyarray);
//getting survey form 

this.service.gettingusersbasedontestanddepartment(this.departmenttogettingsurveyarray).subscribe(res=>{
  console.log(res);
  if(res.message){
    this.useridbasedondepartmentarray.length=0;
    this.useridbasedondepartmentarray=res.userslist;
    this.useridbasedondepartmentcount=this.useridbasedondepartmentarray.length;
  }
});
}



//====> Getting User RESPONSE Based on userid <========
getuserresponse(){
//console.log(this.employeeidtogetresponse);
this.alertmessage="";
this.employeeidarray.length=0;
this.employeeidarray.push({"userid":this.employeeidtogetresponse,"testName":this.testnametogetdepartment.toLowerCase()});

this.service.getuserresponse(this.employeeidarray).subscribe(res=>{
  console.log(res);
  if(res){
    if(res.response.length===0){
      var modal = document.getElementById("myModalforlogin");
      modal.style.display = "block";

      this.alertmessage="Data Not Found Of Selected User !!"
      this.employeefilledresponse.length=0;
      this.testname="";
      this.employeeid="";
      this.department="";

    }else{
    this.employeefilledresponse.length=0;
    this.employeefilledresponse=res.response;
    this.testname=this.employeefilledresponse[0].testName.toUpperCase();
    this.employeeid=this.employeefilledresponse[0].userid.toUpperCase();
    this.department=this.employeefilledresponse[0].department.toUpperCase();
  }
  }
});
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








}
