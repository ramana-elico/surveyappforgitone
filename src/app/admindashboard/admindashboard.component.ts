import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private service:AdminserviceService) { }

  departsmentCount : any;
  departsmentNames : any[]=[];
  departsmentNamesNew:any [] =[];
  departsmentUsersCount : any[]=[];
  departsmentNamesNewForBarChart:any [] =[];
  departsmentUsersCountForBarChart : any[]=[];
  adminsCount : any;
  usersCount : any;
  testnamelist:any[]=[];
  testnamelistduplicate:any[]=[];
  availabletestnamecount:any;
  surveylist:any[]=[];
  surveylistduplicate:any[]=[];
  surveytestnamecount:any;
  ngOnInit(): void {

    //for dashdoard departments count
    this.service.getDepartmentsCountForDashboard().subscribe(res=>{console.log("res.length16",res.departments.length,res.departments);
    this.departsmentCount = res.departments.length;
    for(let i=0;i<res.departments.length;i++)
    {
      this.departsmentNames.push(res.departments[i].department)

    }
    console.log("this.departsmentNames",this.departsmentNames);
    for(let q=0;q<this.departsmentNames.length;q++)
    {
      for(let k=0;k<this.departsmentNames.length-q;k++)
      {
        if(this.departsmentNames[k-1]>this.departsmentNames[k])
        {
          let temp = this.departsmentNames[k];
          this.departsmentNames[k]=this.departsmentNames[k-1];
          this.departsmentNames[k-1]=temp;
        }
      }

    }
    for(let g=0;g<this.departsmentNames.length;g++)
    {
      console.log("this.departsmentNames",this.departsmentNames[g]);
    }
    console.log("this.departsmentNames53",this.departsmentNames);
    for(let j=0; j<this.departsmentNames.length; j++)
        {          
          //for dashdoard all users count
          
          setTimeout(() => {
            this.departsmentNamesNew.length = 0;
          
          this.departsmentNamesNew.push({"department":this.departsmentNames[j]});
          this.service.getOverAllCountForDashboard(this.departsmentNamesNew).subscribe(res=>{console.log("res.length16",res.allUsers);
          if(res.allUsers.length !==0)
          {
            this.departsmentUsersCount.push({"count":res.allUsers.length,"department":res.allUsers[0].Departments});
            console.log(this.departsmentUsersCount);
          }
          
        });
          }, 2000);

        }
        setTimeout(() => {
        for(let b=0;b<this.departsmentUsersCount.length;b++)
        {
          this.departsmentNamesNewForBarChart.push(this.departsmentUsersCount[b].department);
          this.departsmentUsersCountForBarChart.push(this.departsmentUsersCount[b].count)
        }
        console.log('this.departsmentNamesNewForBarChart',this.departsmentNamesNewForBarChart);
        console.log('this.departsmentUsersCountForBarChart',this.departsmentUsersCountForBarChart);
      }, 3000);
        
    
  });

  

    //for dashdoard admins count
    this.service.getAdminsCountForDashboard().subscribe(res=>{console.log("res.length16",res.admins);this.adminsCount = res.admins.length});

    //for dashdoard users count
    this.service.getUsersCountForDashboard().subscribe(res=>{console.log("res.length16",res.users);this.usersCount = res.users.length});

    //for dashboard total testnames
    this.service.gettingtestnameslist().subscribe(res=>{
      
      if(res){
        this.testnamelist.length=0;
        this.testnamelist=res.gettingtestnameslist;
        console.log("getting testnames",res);
        if(this.testnamelist.length===0){
          this.availabletestnamecount=0;
        }else{

       this.testnamelistduplicate= findElements(this.testnamelist);
       this.availabletestnamecount=this.testnamelistduplicate.length;
       setTimeout(() => {
        this.pieChartData.push(this.availabletestnamecount);
       }, 1000);
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

  //for dashboard assigned surveys
  this.service.gettingasignedsurvey().subscribe(res=>{

    this.surveylist.length=0;
    this.surveylist=res.assignedlist;
    console.log("asigned survey",this.surveylist);
    if(this.surveylist.length===0){
      this.surveytestnamecount=0;
    }
    else{
   this.surveylistduplicate= findElements(this.surveylist);
   this.surveytestnamecount=this.surveylistduplicate.length;
   console.log("surcey after duplicate",this.surveytestnamecount);
   setTimeout(() => {
    this.pieChartData.push(this.surveytestnamecount);
   }, 2000);
   setTimeout(() => {
    this.pieChartData.push(this.availabletestnamecount-this.surveytestnamecount);
    console.log("this.pieChartData",this.pieChartData);
   }, 3000);
   
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



      });
  



      
      
        
      

  }

  //pie chart method
  // Pie
        public pieChartLabels:string[] = ["Total Survey Forms","Assigned Survey Forms","Pending Survey Forms"];
        public pieChartData:number[] = [];
        public pieChartType:string = 'pie';
      public piechartcolor=[{
        backgroundColor:['rgba(9,114,184,1)',
        'rgba(99,183,108,1)',
        'rgba(2,164,211,1)']
      }]

        // events
        public chartClicked(e:any):void {
          console.log(e);
        }
      
        public chartHovered(e:any):void {
          console.log(e);
        }
  //end of pie chart method

  //bar chart method
  // bar
        public barChartLabels:string[] = this.departsmentNamesNewForBarChart;
        //public barChartData:number[] = this.departsmentUsersCountForBarChart;
        public barChartData: ChartDataSets[] = [
          { data: this.departsmentUsersCountForBarChart, label: 'Department Name',
          barPercentage: 1.0,
          barThickness: 46,
          maxBarThickness: 48,
          minBarLength: 2, },
          
          // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        public barChartType:string = 'bar';
        public barchartcolor=[{
          backgroundColor:['rgba(9,114,184,1)',
          'rgba(99,183,108,1)',
          'rgba(2,164,211,1)','rgba(93,164,147,1)',
          'rgba(183,104,162,1)',
          'rgba(107,63,160,1)',
          'rgba(9,114,184,1)',
          'rgba(99,183,108,1)',
          'rgba(2,164,211,1)','rgba(93,164,147,1)',
          'rgba(183,104,162,1)',
          'rgba(107,63,160,1)',
          'rgba(9,114,184,1)',
          'rgba(99,183,108,1)',
          'rgba(2,164,211,1)','rgba(93,164,147,1)',
          'rgba(183,104,162,1)',
          'rgba(107,63,160,1)',]
        }]

        // events
        public barchartClicked(e:any):void {
          console.log(e);
        }

        public barchartHovered(e:any):void {
          console.log(e);
        }
  //End of bar chart method

}

