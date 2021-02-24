import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  //profile variables
  profile:any[]=[];

  //==> USED TO SEND PROFILE TO USER COMPONENT
  sendprofiletouser(profile){
    this.profile.length=0;
    this.profile=profile;
  }

  receiveprofilefromservice(){
     return this.profile;
  }



  ///used to save EDITED PROFILE DATA
  saveeditedprofile(profile):Observable<any>{
    console.log("wait!!!")
      return this.http.post<any>('saveeditedprofile',profile);
    }

    //RECALLING THE PROFILE AFTER UPDATION
    recallingtheprofile(profile):Observable<any>{
      return this.http.post<any>('recallingtheprofile',profile);
    }

//getting TESTNAMES based on department
getassignedtestnames(profile):Observable<any>{
  return this.http.post<any>('getassignedtestnames',profile);
}

      //getting TESTNAMES based on department
    gettingsurvey(testName):Observable<any>{
      return this.http.post<any>('gettingsurvey',testName);
    }

    //getting TESTNAMES based on department
    submitsurvey(survey):Observable<any>{
      return this.http.post<any>('submitsurvey',survey);
    }    


           //getting completed Survey based on userid
          gettingcompletedsurvey(profile):Observable<any>{
            return this.http.post<any>('gettingcompletedsurvey',profile);
          } 

   //getting completed survey form based on test name and user id
   gettingcompletedsurveyform(testName):Observable<any>{
    return this.http.post<any>('gettingcompletedsurveyform',testName);
  }

}
