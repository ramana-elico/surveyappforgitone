import { Component, HostListener, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-admincompletesurvey',
  templateUrl: './admincompletesurvey.component.html',
  styleUrls: ['./admincompletesurvey.component.css']
})
export class AdmincompletesurveyComponent implements OnInit {

  constructor(private service:AdminserviceService) {this.today=new Date(); }
  term;
  p:number = 1;
  termforedit;
  pforedit;
  asignedsurveys;
  asignedsurveyspagenation;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;

  dropdownListNew = [];
  selectedItemsNew = [];
  dropdownSettingsNew:IDropdownSettings;

//Below variables are used for getting testnames from database
testnamelist:any[]=[];
testnamelistduplicate:any[]=[];
availabletestnamecount:any;
assigningtestnamerray:any[]=[];

//below variables are used for departments for view in dropdown
departmentslist:any[]=[];
departmentlistfromdatabase:any[]=[];

//below variables are used to view the all questions avilable in testname
questionlistbasedontestname:any[]=[];

//Below variables are used to assign questions to user
departmenttoassign:any;
departmentandtestname:any[]=[];
successmessageafterassiging:any;
selectdepartment:any;
CreatedDate:any;
asignedDate:any;
Enddate:any="null";
///variable are used for editing the question
edittestName:any;
editquestionName1:any="";
option1forQuestion1edit:any;
option2forQuestion1edit:any;
option3forQuestion1edit:any;
option4forQuestion1edit:any;
radiocheckedformultiple=false;
radiocheckedforchooose=false;
questionid:any;
typeafteredit:any;
editedquestion:any[]=[];
messsageafterupdation:any;
openchoosetheansweredit:boolean=false;
openfillintheblankedit:boolean=false;


//variables are used for datepicker
senddate:Date[];
  senddateStart:any;
  senddateEnd:any;
  DateStart=new Date();
  DateEnd=new Date();
  today:any;

  senddateStartNew:any;
  senddateEndNew:any;
  DateStartNew:any;
  DateEndNew:any;

  ngOnInit(): void {
    this.service.gettingtestnameslist().subscribe(res=>{
      
        if(res){
          this.testnamelist.length=0;
          this.testnamelist=res.gettingtestnameslist;
          console.log("getting testnames",this.testnamelist);
          if(this.testnamelist.length===0){
            this.availabletestnamecount=0;
          }else{


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
         
        }
      }
      else{
          //continue..
        }
    });

    //===== Getting all the departments to view in dropdown =====
    this.service.gettingdepartmentslist().subscribe(res=>{
      console.log("department list",res.departments);
      this.departmentslist.length=0;
      this.departmentslist=res.departments;
      //  this.departmentlistfromdatabase.length=0;
      //  this.departmentlistfromdatabase=res.departments;
       console.log(this.departmentslist,this.departmentlistfromdatabase)
      //this.departmentcount=this.departmentslist.length;
      console.log(this.dropdownList);
      //this.departmentcount=this.departmentslist.length;
      //this.dropdownList = this.departmentslist;
      //this.selectedItems = this.departmentslist;
      this.dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'department',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      console.log("this.selectedItems",this.selectedItems);
    });

  }
  multiSelectDropdownValues:any []=[];
  multiSelectDropdownValuesNew:any []=[];
  onItemSelect(item :any) {
    //console.log(item);
    //this.multiSelectDropdownValues.length=0;
    this.multiSelectDropdownValues.push(item);
    console.log("department added ==>",this.multiSelectDropdownValues);
  }
  onSelectAll(items: any) {
    //console.log(items);
    this.multiSelectDropdownValues.length=0;
    this.multiSelectDropdownValues = items;
    console.log(this.multiSelectDropdownValues);
  }
  onItemDeSelect(items: any) {
   // console.log(items);
    this.multiSelectDropdownValues;
    for(let i=0;i<this.multiSelectDropdownValues.length;i++){
      if(items._id===this.multiSelectDropdownValues[i]._id){
        this.multiSelectDropdownValues.splice(i,1);
      }
    }
    console.log("item deleted ==>",this.multiSelectDropdownValues);

  }

  onItemDeSelectAll(items:any){
    //console.log(items)
    this.multiSelectDropdownValues.length=0;
    console.log("deselect all==>",this.multiSelectDropdownValues);
  }










testname:any;
testnameforediting:any;
  viewoverallsurveyform(testname){
    this.messsageafterupdation="";
    document.getElementById("Multipleforedit").style.color="white";
document.getElementById("Fill in the Blankforedit").style.color="white";
this.openchoosetheansweredit=false;
this.openfillintheblankedit=false;
    this.testnameforediting=testname;
    this.assigningtestnamerray.length=0;
this.assigningtestnamerray.push({"testName":testname});
console.log("viewoverallsurveyform",this.assigningtestnamerray);
this.service.viewoverallsurveyform(this.assigningtestnamerray).subscribe(res=>{
  console.log(res);
  if(res){
    this.questionlistbasedontestname.length=0;
this.questionlistbasedontestname=res.questions;
this.testname=this.questionlistbasedontestname[0].testName.toUpperCase();


  }else{//continue..
  }
});
  }  


// //MULTIE SELECT DEPARTMENT
// multiselectarray:any[]=[];
// multiselectdepartment(department,event){


// if(event.target.checked===true){
//   console.log("Add ==>",department);

// if(this.multiselectarray.length===0){
//   this.multiselectarray.push({"department":department});
//   console.log("legth 0");
// }
// else
// {
//                 for(let i=0;i<this.multiselectarray.length;i++){
//                   // console.log("array depart==>",this.multiselectarray[i].department);
//                   if(department===this.multiselectarray[i].department){
//                     this.multiselectarray.splice(i,1);
//                     this.multiselectarray.push({"department":department});
//                   }else{
//                     this.multiselectarray.push({"department":department});
//                   }
//                 }
//                 //  this.multiselectarray.push({"department":department});
// }

// }else if(event.target.checked===false){
//   console.log("delete ==>",department);
//   for(let i=0;i<this.multiselectarray.length;i++){
//     if(department===this.multiselectarray[i].department){
//       this.multiselectarray.splice(i,1);
//       break;
//     }
//   }
// }

// console.log(this.multiselectarray);
// }


// checkedallbox:any=false;
// alldepartment:any="All Departments";

// clear:any[]=[];
// selectalldepartment(event){
// this.clear.length=0;
// if(event.target.checked===true){
//   this.checkedallbox=true;
// this.multiselectarray.length=0;
// this.multiselectarray=this.departmentslist;

// console.log(this.multiselectarray,this.departmentslist)
// }
// else{
//   this.checkedallbox=false;
//   this.multiselectarray=this.clear;
//   //this.multiselectarray.push({"department":department});
//   console.log(this.multiselectarray,this.departmentslist,event.target.checked)

// }
// }

testName:any;
asignedepartments:any[]=[];

gettingtestname(testname){
this.testName=testname;
//this.selectdepartment="Please Select Department For Allocate";
this.asignedepartments.length=0;
this.asignedepartments.push({"testName":this.testName});

this.service.gettingdepartmentslist().subscribe(alldepartments=>{
  if(alldepartments){
    this.departmentslist.length=0;
    this.departmentslist=alldepartments.departments;

    this.service.gettingasigneddepartment(this.asignedepartments).subscribe(res=>{
      if(res){
        this.dropdownListNew=[];
        this.dropdownListNew=res.asignedepartment;
      
        
        //Removing the assigned departments from avilable departments
          console.log("total department 289",this.departmentslist,);
          console.log("asigned departments 290",this.dropdownListNew);
       
      
          for(let i=0;i<this.dropdownListNew.length;i++){
            for(let j=0;j<this.departmentslist.length;j++){
      
              if(this.dropdownListNew[i].department === this.departmentslist[j].department){
                this.departmentslist.splice(j,1);
              }
            }
          }
          console.log("total department after loop",this.departmentslist,);
          console.log("asigned departments",this.dropdownListNew);
          this.dropdownList=[];
           this.dropdownList=this.departmentslist;
      
      }
      })
  }
})





}




//====== Assigng question to users ====
sucessmessage:any;
assignquestiontouser(){
  









console.log(this.testName)

  
  //this.selectdepartment="please Wait !!";
this.successmessageafterassiging="please Wait !!";
this.assigningtestnamerray.length=0;
this.assigningtestnamerray.push({"testName":this.testName});

//this.departmentandtestname.push({"testName":testName,"department":this.departmenttoassign});



  //GETTING CREATED DATE FOR ASSIGNG OF SURVEY TO USERS
  this.service.viewoverallsurveyform(this.assigningtestnamerray).subscribe(res=>{
    console.log(res);
    if(res){
      this.questionlistbasedontestname.length=0;
  this.questionlistbasedontestname=res.questions;
this.CreatedDate=this.questionlistbasedontestname[0].CreatedDate;
this.asignedDate = this.questionlistbasedontestname[0].AsignedDate;
this.Enddate = this.questionlistbasedontestname[0].Enddate;
  
console.log(this.questionlistbasedontestname);
    }else{//continue..
    }
  })


//AsignedDATE SAVING IN DATABASE   
// let today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
// console.log("surveycompleted==>",today);
// this.asignedDate=today;


// var someDate = new Date();
// var numberOfDaysToAdd = 6;
// someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
// var dd = someDate.getDate();
// var mm = someDate.getMonth() + 1;
// var y = someDate.getFullYear();

// this.Enddate = y + '/'+ mm + '/'+ dd;
// console.log("someDate",this.Enddate);



//ASSIGNG OF SURVEY TO USER 
setTimeout(() => {
  
  console.log("created data===>",this.CreatedDate);
  console.log("Asigned date ==>",this.asignedDate)
  console.log("End date ===>",this.Enddate)
  



 console.log(this.departmentandtestname);
 if(this.multiSelectDropdownValues.length===0){
  this.selectdepartment="Please Select Department Here !!!";
  this.successmessageafterassiging="Please Select Department For Allocate";
 }
 else
 {

   //this.departmentandtestname.length=0;
   for(let i=0; i<=this.multiSelectDropdownValues.length-1;i++)
   {
    this.departmentandtestname.length=0;
    console.log("this.departmentslist[i].department",this.multiSelectDropdownValues[i].department);
    this.departmentandtestname.push({"testName":this.testName.toLowerCase(),"department":this.multiSelectDropdownValues[i].department,"CreatedDate":this.CreatedDate,"AsignedDate":this.asignedDate,"Enddate":this.Enddate,"state":"Active"});
              //this.selectdepartment='Loading....';
          this.service.assignquestiontouser(this.departmentandtestname).subscribe(res=>{
            
            if(res.message){
              console.log(res);
              //this.selectdepartment=res.message;
              this.departmentandtestname.length=0;
              this.successmessageafterassiging=res.message;

           
                // //getting all assigned testnames 
                // this.service.gettingasigneddepartment(this.asignedepartments).subscribe(res=>{
                //   this.dropdownListNew=res.asignedepartment;
                // })



            this.selectedItems=[];  
            this.selectedItemsNew=[];
            this.multiSelectDropdownValues.length=0;
            this.ngOnInit();
            }else{
              //this.selectdepartment="Something Went Wrong !!!";
              this.successmessageafterassiging="Survey Assigned Not successfull";
            }
          });

   }




this.gettingtestname(this.testName);
  
   ///Getting all departments and asigned departments
   
  //  this.service.gettingasigneddepartment(this.asignedepartments).subscribe(asigneddepartments=>{
  //    if(asigneddepartments){
  //     this.dropdownListNew=[];
  //     this.dropdownListNew=asigneddepartments.asignedepartment;
  //     this.service.gettingdepartmentslist().subscribe(alldepartments=>{
  //       if(alldepartments){
  //         this.departmentlistfromdatabase.length=0;
  //       this.departmentlistfromdatabase=alldepartments.departments;
  //       // console.log("saikumar avilabe",asigneddepartments)
  //       // console.log("total",this.departmentlistfromdatabase);

  //       for(let i=0;i<this.dropdownListNew.length;i++){
  //         for(let j=0;j<this.departmentlistfromdatabase.length;j++){
    
  //           if(this.dropdownListNew[i].department === this.departmentlistfromdatabase[j].department){
  //             this.departmentlistfromdatabase.splice(j,1);
  //           }
  //         }
  //       }
  //       this.dropdownList=this.departmentlistfromdatabase;
  //       console.log("sai total",this.dropdownList,"sai asigned",this.dropdownListNew);
  //       }



  //     });

  //    }

  //  })
   








 }
//  else{
//   this.departmentandtestname.length=0;
//   this.departmentandtestname.push({"testName":this.testName,"department":this.departmenttoassign,"Date":this.Date});
//   this.successmessageafterassiging='Loading....';
//  this.service.assignquestiontouser(this.departmentandtestname).subscribe(res=>{
//    if(res.message){
//      console.log(res);
//      this.successmessageafterassiging=res.message;

/////  ============== >saikumar  <===========
              //getting remaining departments after asigning 
              // this.asignedepartments.length=0;
              //   this.asignedepartments.push({"testName":this.testName});
              //   this.service.gettingasigneddepartment(this.asignedepartments).subscribe(res=>{
              //   if(res){
              //     this.dropdownListNew=[];
              //     this.dropdownListNew.length=0;
              //     this.dropdownListNew=res.asignedepartment;
              //     this.service.gettingdepartmentslist().subscribe(res=>{
              //       if(res){
              //         this.departmentlistfromdatabase.length=0;
              //         this.departmentlistfromdatabase=res.departments
              //                           //Removing the assigned departments from avilable departments
              //       console.log("total department",this.departmentlistfromdatabase);
              //       console.log("asigned departments",this.dropdownListNew);
              //       let newarray=[];
              //       for(let i=0;i<this.dropdownListNew.length;i++){
              //         for(let j=0;j<this.departmentlistfromdatabase.length;j++){

              //           if(this.dropdownListNew[i].department === this.departmentlistfromdatabase[j].department){
                        
                         
              //           newarray= this.departmentlistfromdatabase.splice(j,1);
              //           }
              //         }
              //       }
              //       console.log("total department",this.departmentlistfromdatabase);
              //       console.log("asigned departments",this.dropdownListNew);
              //       this.dropdownList=[];
              //       this.dropdownList.length=0;
              //       this.dropdownList=newarray;
              //       }
              //     })
                  


              //   }
              //   });








//// ****************************




//    }else{
//      this.successmessageafterassiging="Something Went Wrong !!!";
//    }
//  });

// }
}, 4000);
  
}


//getting asigned departments
gettingdepartment:any[]=[];
gettingasigneddepartment(obj){
  this.selectedItemsNew.length=0;
  this.gettingdepartment.length=0;
this.gettingdepartment.push(obj);
this.service.gettingasigneddepartment(this.gettingdepartment).subscribe(res=>{
  console.log(res);
  //Multiselect dropdown for active and in active
this.dropdownListNew = res.asignedepartment;
//this.selectedItemsNew = this.departmentslist;
this.dropdownSettingsNew = {
  singleSelection: false,
  idField: '_id',
  textField: 'department',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true
};
})

}
//new multiselect dropdown related default methods
onItemSelectNew(item :any) {
  //console.log(item);
  this.multiSelectDropdownValuesNew.push(item);
  console.log("department added ==>",this.multiSelectDropdownValuesNew);
}
onSelectAllNew(items: any) {
  //console.log(items);
  this.multiSelectDropdownValuesNew = items;
  console.log(this.multiSelectDropdownValuesNew);
}
onItemDeSelectNew(items: any) {
 // console.log(items);
  this.multiSelectDropdownValuesNew;
  for(let i=0;i<this.multiSelectDropdownValuesNew.length;i++){
    if(items._id===this.multiSelectDropdownValuesNew[i]._id){
      this.multiSelectDropdownValuesNew.splice(i,1);
    }
  }
  console.log("item deleted ==>",this.multiSelectDropdownValuesNew);

}

onItemDeSelectAllNew(items:any){
  //console.log(items)
  this.multiSelectDropdownValuesNew.length=0;
  console.log("deselect all==>",this.multiSelectDropdownValuesNew);
}
//End of new multiselect dropdown related default methods

dealocate(){
this.successmessageafterassiging="Please Wait !!";

setTimeout(() => {




  if(this.multiSelectDropdownValuesNew.length === 0){
    this.successmessageafterassiging="Please Select Department For Deallocate";
  }
  else{
  for(let i=0;i<this.multiSelectDropdownValuesNew.length;i++){
    console.log("item deleted ==>",this.multiSelectDropdownValuesNew[i]);
    this.service.dealocate(this.multiSelectDropdownValuesNew[i]).subscribe(res=>{
      console.log(res);
      if(res){
        this.successmessageafterassiging=res.message;
        this.ngOnInit();
      }
    });
  }
  this.selectedItemsNew=[];
  this.multiSelectDropdownValuesNew.length=0;



  this.gettingtestname(this.testName);
  

     ///Getting all departments and asigned departments
   
    //  this.service.gettingasigneddepartment(this.asignedepartments).subscribe(asigneddepartments=>{
    //   if(asigneddepartments){
    //    this.dropdownListNew=[];
    //    this.dropdownListNew=asigneddepartments.asignedepartment;
    //    this.service.gettingdepartmentslist().subscribe(alldepartments=>{
    //      if(alldepartments){
    //        this.departmentlistfromdatabase.length=0;
    //      this.departmentlistfromdatabase=alldepartments.departments;
    //      // console.log("saikumar avilabe",asigneddepartments)
    //      // console.log("total",this.departmentlistfromdatabase);
 
    //      for(let i=0;i<this.dropdownListNew.length;i++){
    //        for(let j=0;j<this.departmentlistfromdatabase.length;j++){
     
    //          if(this.dropdownListNew[i].department === this.departmentlistfromdatabase[j].department){
    //            this.departmentlistfromdatabase.splice(j,1);
    //          }
    //        }
    //      }
    //      this.dropdownList=this.departmentlistfromdatabase;
    //      console.log("sai total",this.dropdownList,"sai asigned",this.dropdownListNew);
    //      }
 
 
 
    //    });
 
    //   }
 
    // })
  
}

}, 5000);
}




///gettingasigned survey's
// surveylist:any[]=[];
// state:any;
// //@HostListener('document:click',['$event'])
// gettingasignedsurvey(){
// console.log("get")
//   this.service.gettingasignedsurvey().subscribe(res=>{
// this.surveylist.length=0;
// this.surveylist=res.assignedlist;
//   });


//}

///Making active or inactive 
 activeobject:any={};
stateforsurvey:any;
state:any;
activeorinactive(event,survey){
  console.log(event.target.checked ,survey);
  this.activeobject=survey;
  if(event.target.checked===true){
    this.stateforsurvey="Active";
    this.state="Activated";
    document.getElementById("state").style.color="green";
  }else{
    this.stateforsurvey="InActive";
    this.state="In-Activated";
    document.getElementById("state").style.color="red";
  }


    this.changesurveystate.length=0;
    this.changesurveystate.push({"testname":survey.testName,"state":this.stateforsurvey});
    this.service.changestate(this.changesurveystate).subscribe(res=>{
     
      if(res){
        console.log(res);
        var modal = document.getElementById("myModalforlogin");
        modal.style.display = "block";
        this.ngOnInit();
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

//changing state like active or inactive
 changesurveystate:any[]=[];
// changestate(row,state){
//   console.log(row,state);
//   this.changesurveystate.length=0;
//   this.changesurveystate.push({"_id":row._id,"state":state});
//   this.service.changestate(this.changesurveystate).subscribe(res=>{
//     console.log(res);
//     if(res){
//       //Recalling the getting asigned survey to get data
//       this.service.gettingasignedsurvey().subscribe(res=>{
//         this.surveylist.length=0;
//         this.surveylist=res.assignedlist;
//           });
//     }
//   })
  
// }
 
////To Edit the completed question 
editcompletedquestion(question){
  console.log(question);
  this.questionid=question._id;
  this.edittestName=question.testName;
  this.editquestionName1=question.questionName1;
  this.senddateStart = question.AsignedDate;
  this.DateStart = new Date(question.AsignedDate);
  console.log("this.DateStart 508",this.DateStart,this.senddateStart,this.senddate);
  console.log("this.senddateWhenClick",this.senddateWhenClick);
  this.senddateEnd = question.Enddate;
  this.DateEnd = new Date(question.Enddate);
  console.log("this.DateEnd 510",this.DateEnd,this.senddateEnd);
  this.senddate = [this.DateStart, this.DateEnd];
  console.log("this.senddate",this.senddate);
  this.option1forQuestion1edit=question.option1forQuestion1;
  this.option2forQuestion1edit=question.option2forQuestion1;
  this.option3forQuestion1edit=question.option3forQuestion1;
  this.option4forQuestion1edit=question.option4forQuestion1;
  this.messsageafterupdation="";

  
   this.typeafteredit=question.questiontype;
  console.log(this.typeafteredit);
  if(question.questiontype=="Multiple Type"){
    this.openchoosetheansweredit=true;
    this.openfillintheblankedit=false;
    this.radiocheckedformultiple=true;
    this.radiocheckedforchooose=false;
    document.getElementById("Multipleforedit").style.color="yellow";
    document.getElementById("Fill in the Blankforedit").style.color="white";
    }else if(question.questiontype=="Fill-in-the-blank"){
      this.openchoosetheansweredit=false;
      this.openfillintheblankedit=true;
      this.radiocheckedforchooose=true;
      this.radiocheckedformultiple=false;
      document.getElementById("Fill in the Blankforedit").style.color="yellow";
      document.getElementById("Multipleforedit").style.color="white";
  }else{
    //contuine..
  }

   



}


//saving the edited question into database
saveeditequestion(){

  if(this.typeafteredit==="Fill-in-the-blank"){
  this.option1forQuestion1edit="";
  this.option2forQuestion1edit="";
  this.option3forQuestion1edit="";
  this.option4forQuestion1edit="";
  }else{
  //continue;
  }
  
  
  this.editedquestion.length=0;
  if(this.senddateWhenClick === undefined || !this.senddateWhenClick){
    console.log("check");
    this.senddateStart;
    this.senddateEnd;
    console.log("check",this.senddateStart,this.senddateEnd);
    
  }
  else{
    console.log("check the");
    this.senddateStart = this.DateStartNew;
    this.senddateEnd = this.DateEndNew;
    console.log("check the",this.senddateStart,this.senddateEnd);
  }

  if(this.editquestionName1==="" || this.editquestionName1 ===undefined || this.editquestionName1===null){
    this.messsageafterupdation="Please Enter Question !!";
  }else if(this.typeafteredit==="Multiple Type"){
       
            // option validitaion
            if(this.option1forQuestion1edit===''|| this.option1forQuestion1edit===undefined || this.option1forQuestion1edit===null){
              this.messsageafterupdation="Please select Option 1 !!"; 
             
            }else if(this.option2forQuestion1edit===''|| this.option2forQuestion1edit===undefined || this.option2forQuestion1edit===null){
              this.messsageafterupdation="Please Enter Option 2 !!"; 
             
            }else if(this.option3forQuestion1edit===''|| this.option3forQuestion1edit===undefined || this.option3forQuestion1edit===null){
              this.messsageafterupdation="Please Enter Option 3 !!";
              
            }else if(this.option4forQuestion1edit===''|| this.option4forQuestion1edit===undefined || this.option4forQuestion1edit===null){
              this.messsageafterupdation="Please Enter Option 4 !!"; 
             
            }else{
              this.editedquestion.length=0;
              this.editedquestion.push({"_id":this.questionid,"testName":this.edittestName,"questionName1":this.editquestionName1,"option1forQuestion1":this.option1forQuestion1edit,"option2forQuestion1":this.option2forQuestion1edit,"option3forQuestion1":this.option3forQuestion1edit,"option4forQuestion1":this.option4forQuestion1edit,"questiontype":this.typeafteredit,"AsignedDate":this.senddateStart,"Enddate":this.senddateEnd})
              console.log(this.editedquestion);
              this.service.saveeditedquestion(this.editedquestion).subscribe(res=>{
              if(res){
              
              this.messsageafterupdation=res.message;
              
              //clearing all the data
              //document.getElementById('fillintheBlank').disabled = true;
              this.openchoosetheansweredit=false;
              this.openfillintheblankedit=false;
              this.radiocheckedformultiple=false;
              this.radiocheckedforchooose=false;
              
            
              this.assigningtestnamerray.length=0;
            this.assigningtestnamerray.push({"testName":this.testnameforediting});
            console.log("viewoverallsurveyform",this.assigningtestnamerray);
            this.service.viewoverallsurveyform(this.assigningtestnamerray).subscribe(res=>{
              console.log(res);
              if(res){
                this.questionlistbasedontestname.length=0;
            this.questionlistbasedontestname=res.questions;
            this.testname=this.questionlistbasedontestname[0].testName.toUpperCase();
            document.getElementById("Multipleforedit").style.color="white";
            document.getElementById("Fill in the Blankforedit").style.color="white";
            
              }else{//continue..
              }
            });
              }
              });
            }

  }
else{
  this.editedquestion.length=0;
  this.editedquestion.push({"_id":this.questionid,"testName":this.edittestName,"questionName1":this.editquestionName1,"option1forQuestion1":this.option1forQuestion1edit,"option2forQuestion1":this.option2forQuestion1edit,"option3forQuestion1":this.option3forQuestion1edit,"option4forQuestion1":this.option4forQuestion1edit,"questiontype":this.typeafteredit,"AsignedDate":this.senddateStart,"Enddate":this.senddateEnd})
  console.log(this.editedquestion);
  this.service.saveeditedquestion(this.editedquestion).subscribe(res=>{
  if(res){
  
  this.messsageafterupdation=res.message;
  
  //clearing all the data
  //document.getElementById('fillintheBlank').disabled = true;
  this.openchoosetheansweredit=false;
  this.openfillintheblankedit=false;
  this.radiocheckedformultiple=false;
  this.radiocheckedforchooose=false;
  

  this.assigningtestnamerray.length=0;
this.assigningtestnamerray.push({"testName":this.testnameforediting});
console.log("viewoverallsurveyform",this.assigningtestnamerray);
this.service.viewoverallsurveyform(this.assigningtestnamerray).subscribe(res=>{
  console.log(res);
  if(res){
    this.questionlistbasedontestname.length=0;
this.questionlistbasedontestname=res.questions;
this.testname=this.questionlistbasedontestname[0].testName.toUpperCase();
document.getElementById("Multipleforedit").style.color="white";
document.getElementById("Fill in the Blankforedit").style.color="white";

  }else{//continue..
  }
});
  }
  });
}
  
  }

    //Edit the question type belongs to Editing purposs
    editquestiontypefilltype(){
      this.openchoosetheansweredit=false;
      this.openfillintheblankedit=true;
      this.typeafteredit="Fill-in-the-blank";
      //console.log("Choose",res);
      document.getElementById("Multipleforedit").style.color="white";
      document.getElementById("Fill in the Blankforedit").style.color="yellow";
    }
    editquestiontypeformultiple(){
      // alert("multiple type")
      //console.log(res);
      
        this.openchoosetheansweredit=true;
        this.openfillintheblankedit=false;
        this.typeafteredit="Multiple Type";
        //console.log("multiple",res);
        document.getElementById("Multipleforedit").style.color="yellow";
        document.getElementById("Fill in the Blankforedit").style.color="white";
      
        

      
    }





    senddateWhenClick:Date[];
    bySelectingDateGetClientsList()
  {

    this.senddateWhenClick = this.senddate;
    console.log("this.senddateWhenClick",this.senddateWhenClick);
    console.log("senddate",this.senddate);
    this.senddateStartNew = this.senddate[0];
    console.log("senddate 0",this.senddateStartNew);
    this.senddateEndNew = this.senddate[1];
    console.log("senddate 1",this.senddateEndNew);
    let month;
    let day;
    

    if((this.senddateStartNew.getDate()) < 10)
    {
      day = '0'+ (this.senddateStartNew.getDate())

    }
    else
    {
      day = this.senddateStartNew.getDate()
    }
    
    if((this.senddateStartNew.getMonth() + 1) < 10)
    {
      month = '0'+ (this.senddateStartNew.getMonth() + 1)

    }
    else
    {
      month = (this.senddateStartNew.getMonth() + 1)
    }
    this.DateStartNew = this.senddateStartNew.getFullYear() + '-' + month + '-' + day;
  
    console.log(this.DateStartNew);

    if((this.senddateEndNew.getDate()) < 10)
    {
      day = '0'+ (this.senddateEndNew.getDate())

    }
    else
    {
      day = this.senddateEndNew.getDate()
    }
    
    if((this.senddateEndNew.getMonth() + 1) < 10)
    {
      month = '0'+ (this.senddateEndNew.getMonth() + 1)

    }
    else
    {
      month = (this.senddateEndNew.getMonth() + 1)
    }
    this.DateEndNew = this.senddateEndNew.getFullYear() + '-' + month + '-' + day;
  
    console.log(this.DateEndNew);

  }





}
