import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { from } from 'rxjs';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { DepartmentsComponent } from './departments/departments.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdmincreatesurveyComponent } from './admincreatesurvey/admincreatesurvey.component';
import { AdmincreateusersComponent } from './admincreateusers/admincreateusers.component';
import { AdmincompletesurveyComponent } from './admincompletesurvey/admincompletesurvey.component';
import { ResponsefromUserComponent } from './responsefrom-user/responsefrom-user.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { PastsurveyComponent } from './pastsurvey/pastsurvey.component';
import {HttpClientModule} from '@angular/common/http';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdmintakesurveyComponent } from './admintakesurvey/admintakesurvey.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TitleCasePipe } from '@angular/common';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    AdminhomeComponent,

    DepartmentsComponent,

    AdmincreatesurveyComponent,

    AdmincreateusersComponent,

    AdmincompletesurveyComponent,

    ResponsefromUserComponent,

    UserhomeComponent,

    TakesurveyComponent,

    PastsurveyComponent,

    UserprofileComponent,

    AdmintakesurveyComponent,

    AdminprofileComponent,

    ChangepasswordComponent,

    AdmindashboardComponent,

    TextareaAutoresizeDirective
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    NgxPaginationModule,
    Ng2SearchPipeModule,
    
    HttpClientModule, ChartsModule
  ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
