import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }


    //profile variables
    profile:any[]=[];

    //==> USED TO SEND PROFILE TO Admin COMPONENT
    sendprofiletoadmin(profile){
      this.profile.length=0;
      this.profile=profile;
    }
  
    receiveprofilefromservice(){
       return this.profile;
    }
  





  //The below method is used to save the created questions into database
  savequestion(questionlist):Observable <any>
  {
    console.log("question creation process in service",questionlist);
    return this.http.post<any>('createsurvey',questionlist)
  }

  //The below method is used to get all the completed question to view in Table
  gettingcreatedquestionlist(testname):Observable <any>
  {
    return this.http.post<any>('gettingcreatedquestionlist',testname);
  }

  //The below method is used to get all the created questions list by using tetsname
  gettingcreatedquestion(testname):Observable<any>{
    return this.http.post<any>('gettingcreatedquestion',testname)
  }


  //The below method is used to save new departments into database
  createnewdepartment(newdepartment):Observable<any>{
    return this.http.post<any>('createnewdepartment',newdepartment);
  }

  //The below method is used to get all the departments from database
  gettingdepartmentslist():Observable<any>
  {
    return this.http.get<any>('gettingdepartmentslist');
  }

  //The below method is used to save EDITED QUESTION into database
  saveeditedquestion(editedquestion):Observable<any>{
    console.log("im in service",)
    
    return this.http.post<any>('saveeditedquestions',editedquestion);
  }


  //The Below method is used to delete the question in database
  deletequestion(questionidfordelete):Observable<any>{
    console.log("im in service===>52",questionidfordelete)
    return this.http.post<any>('deletequestionwithID',questionidfordelete);
  }


    // The Below method is used to craete an account in database
    createaccount(credintials):Observable <any>{
        return this.http.post<any>('createaccount',credintials)
    }
  
    // The Below method is used to get all users list from database
    getallusers():Observable<any>{
      return this.http.get<any>('gettingallusers');
    }


    //The Below method is used to getting all the testnames list(for survey forms page to assign)
    gettingtestnameslist():Observable<any>{
      return this.http.get<any>('gettingtestnameslist');
    }

    //The Below method is used to getting all the testnames list assigned to user(for survey forms page to assign)
    gettingasignedsurvey():Observable<any>{
      return this.http.get<any>('gettingasignedsurvey');
    }

    //The Below method is used to getting  the departments which is assigned 
    gettingasigneddepartment(data):Observable<any>{
      return this.http.post<any>('gettingasigneddepartment',data);
    }
//The Below method is used to getting  the departments which is assigned 
dealocate(departmentstodealocate):Observable<any>{
  return this.http.post<any>('dealocate',departmentstodealocate);
}




//The Below method is used to getting all the question based on testname from backend
viewoverallsurveyform(testname):Observable <any>{
  return this.http.post<any>('viewoverallsurveyform',testname);
}

//Below method is used for assigning questions for user
assignquestiontouser(testnameanddepartment):Observable<any>{
  return this.http.post<any>('assignquestiontouser',testnameanddepartment);
}

//Below method is used for save edit department into database..
saveediteddeprtment(departmentandid):Observable<any>{
  return this.http.post<any>('saveediteddeprtment',departmentandid);
}


//Below method is used for change state of asigned question  into database..
changestate(idandstate):Observable<any>{
  return this.http.post<any>('changestate',idandstate);
}


//Below method is used for delete department in database..
deletedepartment(departmentandid):Observable<any>{
  return this.http.post<any>('deletedepartment',departmentandid);
}
//getting departments assigned based upon testname
getdepartmentbasedontestname(testname):Observable<any>{
  return this.http.post<any>('getdepartmentbasedontestname',testname);
}

//getting departments assigned based upon testname
gettingusersbasedontestanddepartment(department):Observable<any>{
  return this.http.post<any>('gettingusersbasedontestanddepartment',department);
}

//getting RESPONSE COMPLETED based upon testname
getuserresponse(userid):Observable<any>{
  return this.http.post<any>('getuserresponse',userid);
}

//getting userobject  based upon credintails
login(idandpassword):Observable<any>{
  return this.http.post<any>('login',idandpassword);
}

///DELETING THE USER BASED ON OBJECT ID
delete(userid):Observable<any>{
  return this.http.post<any>('delete',userid);
}


///FORGOT PASSWORD

/*Here we can generate otp for forgot password users and send that otp to his mail*/
generateAndSendNewPasswordToMail(emailAndOtp):Observable<any>
{
  console.log("email,OTP",emailAndOtp);
  return this.http.post<any>('generateAndSendNewPasswordToMail',emailAndOtp);
};
/*End of Here we can generate otp for forgot password users and send that otp to his mail*/

/*with reference of OTP we are replacing the existing password with new pass word*/
checkWithotp(otpcheck):Observable<any>
{
  console.log("otpcheck",otpcheck);
  return this.http.post<any>('checkWithotp',otpcheck);
};
replaceWithNewPassword(otpAndNewpassword):Observable<any>
{
  console.log("otpAndNewpassword",otpAndNewpassword);
  return this.http.post<any>('replaceWithNewPassword',otpAndNewpassword);
};
/*End of with reference of OTP we are replacing the existing password with new pass word*/

    //getting TESTNAMES based on department
    getassignedtestnames(profile):Observable<any>{
      return this.http.post<any>('getassignedtestnames',profile);
    }




    //getting TESTNAMES based on department
    submitsurvey(survey):Observable<any>{
      return this.http.post<any>('submitsurvey',survey);
    }   

//getting TESTNAMES based on department
gettingsurvey(testName):Observable<any>{
  return this.http.post<any>('gettingsurvey',testName);
}

  ///used to save EDITED PROFILE DATA admin
  saveeditedprofile(profile):Observable<any>{
    //console.log("wait!!!")
      return this.http.post<any>('saveeditedprofile',profile);
    }


      //RECALLING THE PROFILE AFTER UPDATION
      recallingtheprofile(profile):Observable<any>{
        return this.http.post<any>('recallingtheprofile',profile);
      }  

     //Saving the userdetails ,,editing done by admin in getapplicats section 
     saveediteduserdata(userdata):Observable<any>{
      return this.http.post<any>('saveediteduserdata',userdata);
    }  

//viewing the user list based on department 
    viewuserlistbydepartment(department):Observable<any>{
      //console.log(department)
     return this.http.post<any>('viewuserlistbydepartment',department);
        }   

//Below method is used for delete availableusers in database..
deleteavailableusers(departmentandid):Observable<any>{
  return this.http.post<any>('deleteavailableusers',departmentandid);
}


//for dashdoard departments count
getDepartmentsCountForDashboard():Observable<any>
{
  return this.http.get<any>('getDepartmentsCountForDashboard');
}
//for dashdoard all users count
getOverAllCountForDashboard(departsmentNames):Observable<any>
{
  console.log("departsmentNames212",departsmentNames);
  return this.http.post<any>('getOverAllCountForDashboard',departsmentNames);
}


//for dashdoard admins count
getAdminsCountForDashboard():Observable<any>
{
  return this.http.get<any>('getAdminsCountForDashboard');
}

//for dashdoard users count
getUsersCountForDashboard():Observable<any>
{
  return this.http.get<any>('getUsersCountForDashboard');
}


}
