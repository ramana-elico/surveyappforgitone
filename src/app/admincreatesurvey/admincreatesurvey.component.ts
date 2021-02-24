import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-admincreatesurvey',
  templateUrl: './admincreatesurvey.component.html',
  styleUrls: ['./admincreatesurvey.component.css']
})
export class AdmincreatesurveyComponent implements OnInit {
  openchoosetheanswer:boolean=false;
  openfillintheblank:boolean=false;
  openchoosetheansweredit:boolean=false;
  openfillintheblankedit:boolean=false;




  testnamesearch;
  type:any;

  completedquestion=0;
  completedquestionfill=0;
  p: number = 1;
  term;
  sucessmessage;


//variable created for create question form
createdquestionlist:any[]=[];
completedquestionlist:any[]=[];
questionName1:any;
testName:any;
testnamearray:any[]=[];
option1forQuestion1:any;
option2forQuestion1:any;
option3forQuestion1:any;
option4forQuestion1:any;
Date:any;
radioaftersave=false;
edittestname=false;
///variable are used for editing the question
edittestName:any;
editquestionName1:any;
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



//Below variables are used for deleting purpose !!
deletetheid:any;
deletetheidarray:any[]=[];

//variables are used for datepicker
senddate:any;
  senddateStart:any;
  senddateEnd:any;
  DateStart:any;
  DateEnd:any;
  today:any;

  senddateForEdit:Date[];
  senddateStartForEdit:any;
  senddateEndForEdit:any;
  DateStartForEdit=new Date();
  DateEndForEdit=new Date();
  todayForEdit:any;

  senddateStartNew:any;
  senddateEndNew:any;
  DateStartNew:any;
  DateEndNew:any;


    constructor(private http:HttpClient,private service:AdminserviceService) {this.today=new Date(); this.todayForEdit=new Date(); }
  
    testnamelist:any[]=[];
    testnamelistduplicate:any[]=[];
    ngOnInit() {
      this.service.gettingtestnameslist().subscribe(res=>{
      
        if(res){
          this.testnamelist.length=0;
          this.testnamelist=res.gettingtestnameslist;
          //console.log("getting testnames",this.testnamelist);

         this.testnamelistduplicate= findElements(this.testnamelist);
          console.log(this.testnamelistduplicate);
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
  
  
    message:any="";
    checkdupliactestestname(){
      this.message='';
      console.log("blur")
      var modalforquestion = document.getElementById("myModalforlogin");
      for(let i=0;i<this.testnamelistduplicate.length;i++){
        if(this.testName===this.testnamelistduplicate[i].testName){
          modalforquestion.style.display = "block";
          this.message="Testname Already Found !!";
          break;
        }else{
  
        }
      }
  
    }  


  // The Below Method is used to Create a new question in Database !!
  serialnumber:any=0;
    createquestion(createquestiondata){




      var modalforquestion = document.getElementById("myModalforlogin");
      //modal.style.display = "block";

      if(this.testName==='' || this.testName===undefined || this.testName===null){
        this.message="Please Enter Survey Name !!";
        modalforquestion.style.display = "block";
      }
      else if(this.senddate==='' || this.senddate===undefined || this.senddate===null){
        this.message="Please Enter Survey  Validity !!";
        modalforquestion.style.display = "block";

      }else if(this.questionName1==='' || this.questionName1===undefined || this.questionName1===null){
        this.message="Please Enter Question !!";
        modalforquestion.style.display = "block";

      }
      else if(this.type==='' || this.type===undefined || this.type===null){
        this.message="Please Select Question Type !!";
        modalforquestion.style.display = "block";
      }else if(this.type==="Multiple Type"){ 


                    // option validitaion
                    if(this.option1forQuestion1===''|| this.option1forQuestion1===undefined || this.option1forQuestion1===null){
                      this.message="Please select Option 1 !!"; 
                      modalforquestion.style.display = "block";
                    }else if(this.option2forQuestion1===''|| this.option2forQuestion1===undefined || this.option2forQuestion1===null){
                      this.message="Please Enter Option 2 !!"; 
                      modalforquestion.style.display = "block";
                    }else if(this.option3forQuestion1===''|| this.option3forQuestion1===undefined || this.option3forQuestion1===null){
                      this.message="Please Enter Option 3 !!";
                      modalforquestion.style.display = "block"; 
                    }else if(this.option4forQuestion1===''|| this.option4forQuestion1===undefined || this.option4forQuestion1===null){
                      this.message="Please Enter Option 4 !!"; 
                      modalforquestion.style.display = "block";
                    }
                    else{



                      //DATE SAVING IN DATABASE   
                  let today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
                  console.log("date==>",today);
                  this.Date=today;
                  
                  
                  
                  
                  
                  console.log("after creation==>",createquestiondata);
                  
                        this.sucessmessage='';
                        this.serialnumber=this.serialnumber+1;
                        this.createdquestionlist.length=0;
                        this.createdquestionlist.push({"serialnumber":this.serialnumber,"testName":this.testName.toLowerCase(),"questionName1":this.questionName1,"option1forQuestion1":this.option1forQuestion1,"option2forQuestion1":this.option2forQuestion1,"option3forQuestion1":this.option3forQuestion1,"option4forQuestion1":this.option4forQuestion1,"CreatedDate":this.Date,"questiontype":this.type,"state":"InActive","AsignedDate":this.DateStart,"Enddate":this.DateEnd});
                        //saving question into database
                        this.service.savequestion(this.createdquestionlist).subscribe(res=>{
                          console.log("after saving question into database===>",res)
                          if(res){
                            this.sucessmessage=res.message;
                            this.questionName1='';
                            this.option1forQuestion1='';
                            this.option2forQuestion1='';
                            this.option3forQuestion1='';
                            this.option4forQuestion1='';
                            this.type="";
                            this.openchoosetheanswer=false;
                              this.openfillintheblank=false;
                              document.getElementById("fillintheBlank").style.color="white";
                              document.getElementById("Multiple").style.color="white";
                              this.edittestName=true;
                            
                    
                            // this.radioaftersave=false;
                  
                            //getting all the created question list after saving a new list
                            this.testnamearray.length=0;
                            this.testnamearray.push({"testname":this.testName.toLowerCase()});
                            this.service.gettingcreatedquestionlist(this.testnamearray).subscribe(res=>{
                              console.log("Created question are==>",res);
                              this.completedquestionlist.length=0;
                              this.completedquestionlist=res.createdquestionlist;
                              this.completedquestion=this.completedquestionlist.length;
                            });
                  
                  
                  
                          }else{
                              this.sucessmessage="Something went wrong !!";
                          }
                        })
                    
                      }




      }
      else{

        this.option1forQuestion1='';
        this.option2forQuestion1='';
        this.option3forQuestion1='';
        this.option4forQuestion1='';

   //DATE SAVING IN DATABASE   
let today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
console.log("date==>",today);
this.Date=today;





console.log("after creation==>",createquestiondata);

      this.sucessmessage='';
      this.serialnumber=this.serialnumber+1;
      this.createdquestionlist.length=0;
      this.createdquestionlist.push({"serialnumber":this.serialnumber,"testName":this.testName.toLowerCase(),"questionName1":this.questionName1,"option1forQuestion1":this.option1forQuestion1,"option2forQuestion1":this.option2forQuestion1,"option3forQuestion1":this.option3forQuestion1,"option4forQuestion1":this.option4forQuestion1,"CreatedDate":this.Date,"questiontype":this.type,"state":"InActive","AsignedDate":this.DateStart,"Enddate":this.DateEnd});
      //saving question into database
      this.service.savequestion(this.createdquestionlist).subscribe(res=>{
        console.log("after saving question into database===>",res)
        if(res){
          this.sucessmessage=res.message;
          this.questionName1='';
          this.option1forQuestion1='';
          this.option2forQuestion1='';
          this.option3forQuestion1='';
          this.option4forQuestion1='';
           this.openchoosetheanswer=false;
           this.openfillintheblank=false;
           document.getElementById("fillintheBlank").style.color="white";
           document.getElementById("Multiple").style.color="white";
           this.edittestName=true;
          
 
          // this.radioaftersave=false;

          //getting all the created question list after saving a new list
          this.testnamearray.length=0;
          this.testnamearray.push({"testname":this.testName.toLowerCase()});
          this.service.gettingcreatedquestionlist(this.testnamearray).subscribe(res=>{
           console.log("Created question are==>",res);
           this.completedquestionlist.length=0;
            this.completedquestionlist=res.createdquestionlist;
            this.completedquestion=this.completedquestionlist.length;
          });



        }else{
           this.sucessmessage="Something went wrong !!";
        }
      })
  
    }
    }  
    
//Below Method is used to select question type for user 
questiontypeformultiple(){
  document.getElementById("Multiple").style.color="yellow";
        document.getElementById("fillintheBlank").style.color="white";
        this.openchoosetheanswer=true;
        this.openfillintheblank=false;
        this.type="Multiple Type";
}
questiontypeforfill(){
  document.getElementById("fillintheBlank").style.color="yellow";
  document.getElementById("Multiple").style.color="white";
  this.openchoosetheanswer=false;
  this.openfillintheblank=true;
  this.type="Fill-in-the-blank";
}

    // questiontype(res){
      
    //   console.log(res);
    //   if(res==="Multiple Options"){
    //     document.getElementById("Multiple").style.color="green";
    //     document.getElementById("fillintheBlank").style.color="black";
    //     this.openchoosetheanswer=true;
    //     this.openfillintheblank=false;
    //     this.type="Multiple Type";
    //   }else if(res==="Fill in the Blank"){
    //     document.getElementById("fillintheBlank").style.color="green";
    //     document.getElementById("Multiple").style.color="black";
    //     this.openchoosetheanswer=false;
    //     this.openfillintheblank=true;
    //     this.type="Fill-in-the-blank";
    //   }
    // }

    //Edit the question type belongs to Editing purposs
    editquestiontype(res){
      // alert("multiple type")
      console.log(res);
      if(res==="Multiple"){
        this.openchoosetheansweredit=true;
        this.openfillintheblankedit=false;
        this.typeafteredit="Multiple Type";
        console.log("multiple",res);
      }else if(res==="Fill in the Blank"){
        this.openchoosetheansweredit=false;
        this.openfillintheblankedit=true;
        this.typeafteredit="Fill-in-the-blank";
        console.log("Choose",res);
      }
    }


    
////To Edit the completed question 
editcompletedquestion(question){
  console.log(question);
  this.questionid=question._id;
  this.edittestName=question.testName;
  this.senddateStartForEdit = question.AsignedDate;
  this.DateStartForEdit = new Date(question.AsignedDate);
  console.log("this.DateStartForEdit 508",this.DateStartForEdit,this.senddateStartForEdit,this.senddateForEdit);
  console.log("this.senddateWhenClick",this.senddateWhenClick);
  this.senddateEndForEdit = question.Enddate;
  this.DateEndForEdit = new Date(question.Enddate);
  console.log("this.DateEndForEdit 510",this.DateEndForEdit,this.senddateEndForEdit);
  this.senddateForEdit = [this.DateStartForEdit, this.DateEndForEdit];
  console.log("this.senddateForEdit",this.senddateForEdit);


  this.editquestionName1=question.questionName1;
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
    }else if(question.questiontype=="Fill-in-the-blank"){
      this.openchoosetheansweredit=false;
      this.openfillintheblankedit=true;
      this.radiocheckedforchooose=true;
      this.radiocheckedformultiple=false;
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
if(this.senddateWhenClick === undefined || !this.senddateWhenClick){
  console.log("check");
  this.senddateStartForEdit;
  this.senddateEndForEdit;
  console.log("check",this.senddateStartForEdit,this.senddateEndForEdit);
  
}
else{
  console.log("check the");
  this.senddateStartForEdit = this.DateStartNew;
  this.senddateEndForEdit = this.DateEndNew;
  console.log("check the",this.senddateStartForEdit,this.senddateEndForEdit);
}


this.editedquestion.length=0;
this.editedquestion.push({"_id":this.questionid,"testName":this.edittestName.toLowerCase(),"questionName1":this.editquestionName1,"option1forQuestion1":this.option1forQuestion1edit,"option2forQuestion1":this.option2forQuestion1edit,"option3forQuestion1":this.option3forQuestion1edit,"option4forQuestion1":this.option4forQuestion1edit,"questiontype":this.typeafteredit,"AsignedDate":this.senddateStartForEdit,"Enddate":this.senddateEndForEdit})
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

            //getting all the created question list after saving a Edited List
             this.testnamearray.length=0;
             this.testnamearray.push({"testname":this.testName.toLowerCase()});
            this.service.gettingcreatedquestionlist(this.testnamearray).subscribe(res=>{
             console.log("Created question are==>",res);
              if(res){
                this.createdquestionlist.length=0;
                this.completedquestionlist=res.createdquestionlist;
                this.completedquestion=this.completedquestionlist.length;
              }else{
                //contuine..
              }
            });
}
});


}

questionfordelete:any={};
alertfordeletequestion(question){
  this.questionfordelete=question;
  console.log(this.questionfordelete);
}






///The Below Method is USed to Delete The Question
deletequestion(question){
  
  this.deletetheid=question._id;
  this.deletetheidarray.length=0;
  this.deletetheidarray.push({"_id":this.deletetheid});
  console.log(this.deletetheidarray);
  this.service.deletequestion(this.deletetheidarray).subscribe(res=>{
    console.log("res",res);
    if(res){

      
            //getting all the created question list after saving a Edited List
            this.testnamearray.length=0;
            this.testnamearray.push({"testname":this.testName.toLowerCase()});
            this.service.gettingcreatedquestionlist(this.testnamearray).subscribe(res=>{
             console.log("Created question are==>",res);
              if(res){
                this.createdquestionlist.length=0;
                this.completedquestionlist=res.createdquestionlist;
                this.completedquestion=this.completedquestionlist.length;
              }else{
                //contuine..
              }
            });
    }else{
      //contuine..
    }
  });
}



//FINAL SUBMIT METHOD

finaltestname:any;
finalcompletedquestion:any;

finalsubmit(){
  this.completedquestionlist.length=0;
  this.finaltestname=this.testName;
  this.finalcompletedquestion=this.completedquestion;
  this.testName="";
  this.completedquestion=0;
  this.sucessmessage='';
  this.edittestName=false;
  this.serialnumber=0;
}

bySelectingDateGetClientsList()
  {

    console.log("senddate",this.senddate);
    this.senddateStart = this.senddate[0];
    console.log("senddate 0",this.senddateStart);
    this.senddateEnd = this.senddate[1];
    console.log("senddate 1",this.senddateEnd);
    let month;
    let day;
    

    if((this.senddateStart.getDate()) < 10)
    {
      day = '0'+ (this.senddateStart.getDate())

    }
    else
    {
      day = this.senddateStart.getDate()
    }
    
    if((this.senddateStart.getMonth() + 1) < 10)
    {
      month = '0'+ (this.senddateStart.getMonth() + 1)

    }
    else
    {
      month = (this.senddateStart.getMonth() + 1)
    }
    this.DateStart = this.senddateStart.getFullYear() + '-' + month + '-' + day;
    //this.DateStart = day + '-' + month + '-' + this.senddateStart.getFullYear();
  
    console.log(this.DateStart);

    if((this.senddateEnd.getDate()) < 10)
    {
      day = '0'+ (this.senddateEnd.getDate())

    }
    else
    {
      day = this.senddateEnd.getDate()
    }
    
    if((this.senddateEnd.getMonth() + 1) < 10)
    {
      month = '0'+ (this.senddateEnd.getMonth() + 1)

    }
    else
    {
      month = (this.senddateEnd.getMonth() + 1)
    }
    this.DateEnd = this.senddateEnd.getFullYear() + '-' + month + '-' + day;
    //this.DateEnd = day + '-' + month + '-' + this.senddateEnd.getFullYear();
  
    console.log(this.DateEnd);

  }


  senddateWhenClick:Date[];
  bySelectingDateGetPickerDateEdit()
  {

    this.senddateWhenClick = this.senddateForEdit;
    console.log("this.senddateWhenClick",this.senddateWhenClick);
    console.log("senddateForEdit",this.senddateForEdit);
    this.senddateStartNew = this.senddateForEdit[0];
    console.log("senddate 0",this.senddateStartNew);
    this.senddateEndNew = this.senddateForEdit[1];
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
