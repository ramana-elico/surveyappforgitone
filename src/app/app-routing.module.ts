import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmincompletesurveyComponent } from './admincompletesurvey/admincompletesurvey.component';
import { AdmincreatesurveyComponent } from './admincreatesurvey/admincreatesurvey.component';
import { AdmincreateusersComponent } from './admincreateusers/admincreateusers.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdmintakesurveyComponent } from './admintakesurvey/admintakesurvey.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HomeComponent } from './home/home.component';
import { PastsurveyComponent } from './pastsurvey/pastsurvey.component';
import { ResponsefromUserComponent } from './responsefrom-user/responsefrom-user.component';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserprofileComponent } from './userprofile/userprofile.component';



const routes: Routes = [
                      {path:'adminhome',component:AdminhomeComponent,children: [{path:'Departments',component:DepartmentsComponent},{path:'Createsurvey',component:AdmincreatesurveyComponent},{path:'Createuser',component:AdmincreateusersComponent},{path:'Completedsurvey',component:AdmincompletesurveyComponent},{path:'UserResponse',component:ResponsefromUserComponent},{path:'admintakesurvey',component:AdmintakesurveyComponent},{path:'adminprofile',component:AdminprofileComponent},{path:'admindashboard',component:AdmindashboardComponent},{path:'',component:AdmindashboardComponent}]},
                      {path:'userhome',component:UserhomeComponent,children:[{path:'takesurvey',component:TakesurveyComponent},{path:'pastsurvey',component:PastsurveyComponent},{path:'profile',component:UserprofileComponent}]}  
                       ,{path:'home',component:HomeComponent},
                       {path:'changepassword',component:ChangepasswordComponent},
                       {path: '', redirectTo: '/home', pathMatch: 'full' },
                      //  {path:'Logout',component:HomeComponent}
                       //{path: '**', redirectTo: '/home', pathMatch: 'full' }
                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
