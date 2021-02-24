const exp=require('express');
const app=exp();
var bodyparser=require('body-parser');
app.use(bodyparser.json());
var http=require('http');
var nodemailer = require('nodemailer');
app.use(bodyparser.urlencoded({
    extended:false
}));






//integration

const path=require('path');
console.log(__dirname);

// =======>>>>>>>>>>>   database connection  starts <<<<<<<<=============
var mongoclient=require('mongodb').MongoClient;
var dbo;

var url="mongodb+srv://saikumar:saikumarpassword@cluster0.r6tyj.mongodb.net/Surveydatabase?retryWrites=true&w=majority";
mongoclient.connect(url,{ useUnifiedTopology: true },(err,client)=>
{
    if(err){
        console.log("db not connected",err);
        
    }else{
        dbo=client.db('Surveydatabase');
        console.log("DB connected");
    }
})

// database connection ENDS


//connecting anulgar to backend
app.use(exp.static (path.join(__dirname,'dist/SURVEY')));


///Creating Question and saving into database
app.post('/createsurvey',(req,res)=>{
    //console.log("req.body===>",req.body);
    //console.log("request",req);
    dbo.collection('createsurvey').insertMany(req.body,(err,dataArray)=>
        {
            if(err)
            {
                //console.log('error in sending')
                console.log(err)
            }
            else
            {
                res.json({message:"Question Created Successfully"})
            }
        });
});



//******************  getting all created testnames for dropdown *********/

///getting testnames from database
// app.get('/gettingtestnameslist',(req,res)=>{
    
//     //console.log("request",req);
//     dbo.collection('createsurvey').find({}).toArray((err,testnamelist)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.json({message:"Testnamelist Found",testnamelist});
//         }
//     })
// });



///************ getting all created questions list from database */
app.post('/gettingcreatedquestionlist',(req,res)=>{
    //console.log("request",req.body);

    dbo.collection('createsurvey').find({testName:{$eq:req.body[0].testname}}).toArray((err,createdquestionlist)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"createdquestionlist Found",createdquestionlist});
        }
    });
});

//**************    saving Departments into database */

///createnewdepartment
app.post('/createnewdepartment',(req,res)=>{
    console.log("req.body===>",req.body);
    dbo.collection('departments').insertMany(req.body,(err,dataArray)=>
        {
            if(err)
            {
                console.log('error in sending');
                console.log(err);
            }
            else
            {
                res.json({message:"Department Created Successfully"});
            }
        });
});

//*** Getting All The Departments from database */
app.get('/gettingdepartmentslist',(req,res)=>{
    
    //console.log("request",req);
    dbo.collection('departments').find({}).toArray((err,departments)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"departments Found",departments});
        }
    })
});

var ObjectID = require('mongodb').ObjectID; 

// Upadating Edited Question into Database Through Id
app.post('/saveeditedquestions',(req,res)=>{
console.log("127 line number==>",req.body);
    dbo.collection("createsurvey").updateMany({"_id": ObjectID(req.body[0]._id)},{$set:{questionName1:req.body[0].questionName1,option1forQuestion1:req.body[0].option1forQuestion1,option2forQuestion1:req.body[0].option2forQuestion1,option3forQuestion1:req.body[0].option3forQuestion1,option4forQuestion1:req.body[0].option4forQuestion1,questiontype:req.body[0].questiontype,AsignedDate:req.body[0].AsignedDate,Enddate:req.body[0].Enddate}},(err,success)=>
       {
           if(err)
           {
               console.log(err)
           }
           else
           {
               //res.json({message:"Question Updation Success !!"})
               dbo.collection("createsurvey").updateMany({testName:req.body[0].testName},{$set:{AsignedDate:req.body[0].AsignedDate,Enddate:req.body[0].Enddate}},(err,success)=>
       {
           if(err)
           {
               console.log(err)
           }
           else
           {
               res.json({message:"Question Updated Successfully !!"})
               

           }
       })

           }
       })


});



//Deleting the question using question id in database

var ObjectIDfordelete = require('mongodb').ObjectID; 

app.post('/deletequestionwithID',(req,res)=>{
 console.log("deletequestionwithID line number==>",req.body);
        dbo.collection("createsurvey").deleteOne({"_id": ObjectIDfordelete(req.body[0]._id)},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"Question Deleted Success !!"})
               }
           })
    
    
    });


//==============     USER CREATION ================
app.post('/createaccount',(req,res)=>{
    console.log("req.body===>",req.body);
    //console.log("request",req);
    dbo.collection('usercreation').insertMany(req.body,(err,dataArray)=>
        {
            if(err)
            {
                console.log('error in sending')
                console.log(err)
            }
            else
            {
                res.json({message:"User Created Successfully"})
            }
        });
});


//========== Getting All Users  ===========
app.get('/gettingallusers',(req,res)=>{
    
    //console.log("request",req);
    dbo.collection('usercreation').find({}).toArray((err,usercreationlist)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"userlist Found",usercreationlist});
        }
    });
});


//Getting all users based on DEPARTMENT 
app.post('/viewuserlistbydepartment',(req,res)=>{
    console.log("viewuserlistbydepartment",req.body);

    dbo.collection('usercreation').find({Departments:{$eq:req.body[0].Departments}}).toArray((err,usersbydepartment)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"users Found based on department",usersbydepartment});
        }
    });
});

//Getting all departments which is assigned
app.post('/gettingasigneddepartment',(req,res)=>{
    console.log("gettingasigneddepartment",req.body);

    dbo.collection('surveyassigned').find({testName:{$eq:req.body[0].testName}}).toArray((err,asignedepartment)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"asignedepartment found",asignedepartment});
        }
    });
});










//======== Getting all created question to survey form page to assign survey to users

app.get('/gettingtestnameslist',(req,res)=>{
    
    //console.log("request",req);
    dbo.collection('createsurvey').find().toArray((err,gettingtestnameslist)=>{
        if(err){
            console.log(err);
        }else{

            res.json({message:"gettingtestnameslist Found",gettingtestnameslist});
           }
    })
});

//======== Getting all Asigned  survey forms to departments from database

app.get('/gettingasignedsurvey',(req,res)=>{
    
    //console.log("request",req);
    dbo.collection('surveyassigned').find().toArray((err,assignedlist)=>{
        if(err){
            console.log(err);

        }else{

            res.json({message:"assignedlist Found",assignedlist});
           }
    })
});




//========= Getting all the question Based on testname ======
app.post('/viewoverallsurveyform',(req,res)=>{
    //console.log("request",req.body);

    dbo.collection('createsurvey').find({testName:{$eq:req.body[0].testName}}).toArray((err,questions)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"question Found based on testname",questions});
        }
    })
});

///==============ASSIGNING QUESTION TO USER USING TESTNAME AND DEPARTMENT ...====

app.post('/assignquestiontouser',(req,res)=>{
    console.log("assignquestiontouser==>",req.body);
    
    dbo.collection('surveyassigned').insertMany(req.body,(err,dataArray)=>
    {
        if(err)
        {
            //console.log('error in sending')
            console.log(err)
        }
        else
        {
            //Setting state for Question in create survey collection for binding the toggle button in survey forms page 
            dbo.collection("createsurvey").updateMany({testName:req.body[0].testName},{$set:{state:req.body[0].state}},(err,success)=>
                   {
                       if(err)
                       {
                           console.log(err)
                       }
                       else
                       {
                           //res.json({message:"Survey Assigned Successfully"})
           //Setting state for Question in assigned asigned collection keeping all testnames active  
            dbo.collection("surveyassigned").updateMany({testName:req.body[0].testName},{$set:{state:req.body[0].state}},(err,success)=>
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.json({message:"Survey Allocated Successfully !!"})
                }
            });



                       }
                   });
        }
    });
    
    
    });
    

//============ EDITING USER AND SAVING INTO DATABASE(get applicats list and editing done by admin)====
var objectforuser = require('mongodb').ObjectID; 
app.post('/saveediteduserdata',(req,res)=>{
    console.log("saveediteduserdata ==>",req.body);
    
        dbo.collection("usercreation").updateMany({"_id":objectforuser(req.body[0]._id)},{$set:{UserName:req.body[0].UserName,EmailID:req.body[0].EmailID,Role:req.body[0].Role,Departments:req.body[0].Department,Password:req.body[0].Password}},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"User Details Updated Successfully !!"})
               }
           });
    
    
    });

//DEALOCATING THE SURVEY TO USERS
var dealocation = require('mongodb').ObjectID; 

app.post('/dealocate',(req,res)=>{
 console.log("dealocate line number==>",req.body);
        dbo.collection("surveyassigned").deleteOne({"_id": dealocation(req.body._id)},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"Survey Deallocated Successfully !!"})
               }
           })
    
    
    });





//============ EDITING DEPARTMENTS AND SAVING INTO DATABASE====
var objectfordepartment = require('mongodb').ObjectID; 
app.post('/saveediteddeprtment',(req,res)=>{
    console.log("departments==>",req.body);
    
        dbo.collection("departments").updateMany({"_id":objectfordepartment(req.body[0]._id)},{$set:{department:req.body[0].department}},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"Department Updated Succefully !!"});
               }
           });
    
    
    });

    
//============ EDITING STATE OF QUESTION AND SAVING INTO DATABASE====
var objectforQUESTION = require('mongodb').ObjectID; 
app.post('/changestate',(req,res)=>{
    //console.log("departments==>",req.body);
    
        dbo.collection("surveyassigned").updateMany({testName:req.body[0].testname},{$set:{state:req.body[0].state}},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   //res.json({message:"state update Success !!"})
                   dbo.collection("createsurvey").updateMany({testName:req.body[0].testname},{$set:{state:req.body[0].state}},(err,success)=>
                   {
                       if(err)
                       {
                           console.log(err)
                       }
                       else
                       {
                           res.json({message:"State Updation Success !!"})
                       }
                   });



               }
           });
    
    
    });








//======= DELETE DEPARTMENT =======
var ObjectIDfordelete = require('mongodb').ObjectID; 

app.post('/deletedepartment',(req,res)=>{
 //console.log("deletedepartment line number==>",req.body);
        dbo.collection("departments").deleteOne({"_id": ObjectIDfordelete(req.body[0]._id)},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"Department Deleted Success !!"})
               }
           })
    
    
    });

//========= Getting all the DEPARTMENTS Based on testname ======
app.post('/getdepartmentbasedontestname',(req,res)=>{
    //console.log("request",req.body);

    dbo.collection('surveyassigned').find({testName:{$eq:req.body[0].testName}}).toArray((err,departments)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"departments Found based on testname",departments});
        }
    })
});

//===== GETTING ALL THE USERS BASED ON DEPARTMENT & TESTNAME
app.post('/gettingusersbasedontestanddepartment',(req,res)=>{
    console.log("request",req.body);
//sconsole.log(req.body[0].department)
    dbo.collection("usercreation").find({Departments:{$eq:req.body[0].department}}).toArray((err,userslist)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"createdquestionlist Found",userslist});
        }
    });
});



//======  getting USERRESPONSE from database based on userid ==
app.post('/getuserresponse',(req,res)=>{
    
    console.log("request",req.body);
    dbo.collection('responsefromuser').find({userid:{$eq:req.body[0].userid},testName:{$eq:req.body[0].testName},status:{$eq:'completed'}}).toArray((err,response)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"response Found",response});
        }
    });
});



//======  getting USEROBJECT from database based on userid and password (LOGIN) ==
app.post('/login',(req,res)=>{
    
    console.log("request",req.body);
    dbo.collection('usercreation').find({EmployeeID:{$eq:req.body[0].EmployeeId}}).toArray((err,response)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"User Found",response});
        }
    });
});

////DELETE THE USER BASED ON USERID
var ObjectIDfordeleteuser = require('mongodb').ObjectID; 

app.post('/delete',(req,res)=>{
 console.log("deletequestionwithID line number==>",req.body);
        dbo.collection("usercreation").deleteOne({"_id": ObjectIDfordeleteuser(req.body[0]._id)},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"User Deleted Success !!"});
               }
           })
    
    
    });

////FORGOT PASSWORD
/*Here we can generate otp for forgot password users and send that otp to his mail*/
app.post('/generateAndSendNewPasswordToMail',(req,res)=>
{
    console.log("request",req.body);
    console.log("request",req.body[0].email,req.body[0].otp);
    

      /*Finding email and replace the password with otp*/
      dbo.collection('usercreation').find({EmailID:{$eq:req.body[0].email}}).toArray((err,response)=>{
        if(err){
            console.log(err);
            res.json({message:"User not found"});
        }
        else if(response.length === 0){console.log("err",err);res.send({message:"User not found"});}
        else if(response){  
            //response.json({message:"User Found 1"});
            //res.json({message:"user found"});
        
            console.log("response388",response);
            console.log("response388",response.length);
            dbo.collection('usercreation').updateMany({EmailID:{$eq:req.body[0].email}},{$set:{OTP:req.body[0].otp}},function(err,response)
            {
                if(err){console.log("err",err);res.send({message:"OTP Not Generated"});}
                else if(!response){console.log("err",err);res.send({message:"OTP Not Generated"});}
                else
                {console.log("response394",response);
                res.send({message:"OTP Generated"});
                // var transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //       user: 'cvramana404@gmail.com',
                //       pass: '7204281483'
                //     }
                //   });
                  
                //   var mailOptions = {
                //     from: 'cvramana404@gmail.com',
                //     to: req.body[0].email,
                //     subject: 'New Password for Your Login',
                //     text: req.body[0].otp
                //   };
                  
                //   transporter.sendMail(mailOptions, function(error, info){
                //     if (error) {
                //       console.log(error);
                //     } else {
                //       console.log('Email sent: ' + info.response);
                //     }
                //   });
                };
                

            })
            
            
            
        }
    });
    /*End of Finding email and replace the password with otp*/
});
/*End of Here we can generate otp for forgot password users and send that otp to his mail*/

/*with reference of OTP we are replacing the existing password with new pass word*/
app.post('/checkWithotp',(req,res)=>
{
    console.log("req400",req.body);
    dbo.collection('usercreation').find({OTP:{$eq:req.body[0].otp}}).toArray((err,response)=>{
        if(err){
            console.log('err',err);
            res.json({message:"OTP Not Found"});
        }
        else if(response.length === 0){
            console.log('response430',response);
            res.json({message:"OTP Not Found"});
        }

        else{
            console.log('response430',response);
            res.json({message:"OTP Found",response});
        }
    });     

});


app.post('/replaceWithNewPassword',(req,res)=>
{
    console.log("req437",req.body);
    dbo.collection('usercreation').updateMany({OTP:{$eq:req.body[0].otp}},{$set:{Password:req.body[0].newPassword}},function(err,response)
    {
        if(err){console.log('err',err);res.json({message:"Password Not Updated"});}
        else{res.json({message:"Password Updated"})}
    })
    

});
/*End of with reference of OTP we are replacing the existing password with new pass word*/


//======= DELETE availableusers in particular department =======
var ObjectIDfordelete = require('mongodb').ObjectID; 

app.post('/deleteavailableusers',(req,res)=>{
 
        dbo.collection("departments").deleteOne({"_id": ObjectIDfordelete(req.body[0]._id)},(err,success)=>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   res.json({message:"user avilable in particular department Deleted Success !!"})
               }
           })
    
    
    });

    //for dashdoard departments count
    app.get('/getDepartmentsCountForDashboard',(req,res)=>{
    
        //console.log("request",req);
        dbo.collection('departments').find({}).toArray((err,departments)=>{
            if(err){
                console.log(err);
            }else{
                res.json({message:"departments Found",departments});
            }
        })
    });

    //for dashdoard all users count
    app.post('/getOverAllCountForDashboard',(req,res)=>{
    
        console.log("getOverAllCountForDashboard",req.body[0].department);
        dbo.collection('usercreation').find({Departments:{$eq:req.body[0].department}}).toArray((err,allUsers)=>{
            if(err){
                console.log(err);
            }else{
                res.json({message:"all users Found",allUsers});
            }
        })
    });

//for dashdoard admins count
app.get('/getAdminsCountForDashboard',(req,res)=>{
    
    //console.log("request",req);
    dbo.collection('usercreation').find({Role:{$eq:"Admin"}}).toArray((err,admins)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"users Found",admins});
        }
    })
});

//for dashdoard users count
app.get('/getUsersCountForDashboard',(req,res)=>{

    //console.log("request",req);
    dbo.collection('usercreation').find({Role:{$eq:"User"}}).toArray((err,users)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"users Found",users});
        }
    })
});











//================================>  USER SECTION STARTS FROM HERE <================================


//PROFILE UPDATION
var objectforprofile = require('mongodb').ObjectID; 
app.post('/saveeditedprofile',(req,res)=>{
    console.log("==>",req.body);
    
        dbo.collection("usercreation").updateMany({"_id":objectforprofile(req.body[0]._id)},{$set:{Password:req.body[0].Password}},(err,success)=>
           {
               if(err)
               {
                   console.log(err);

               }
               else
               {
                   res.json({message:"Password Updated Successfully !!"});
               }
           });
    
    
    });


    
//===== GETTING PROFILE AFTER UPADTION
var recallingtheprofile = require('mongodb').ObjectID; 
app.post('/recallingtheprofile',(req,res)=>{
    console.log("request",req.body);
//sconsole.log(req.body[0].department)
    dbo.collection("usercreation").find({"_id":recallingtheprofile(req.body[0]._id)}).toArray((err,profile)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"profile Found",profile});
        }
    });
});


//// GETTING TESTNAMES BASED ON DEPARTMENT IN TAKE SURVEY PAGE
app.post('/getassignedtestnames',(req,res)=>{
    console.log("request",req.body);
//sconsole.log(req.body[0].department)

    dbo.collection("surveyassigned").find({$and:[{department:{$eq:req.body[0].Departments}},{state:{$eq:"Active"}}]}).toArray((err,testnames)=>{
        if(err){
            console.log(err);
        }else{
            console.log("testnames 588",testnames);
            res.json({message:"testnames Found",testnames});
        }
    });
});


//// GETTING gettingcompletedsurvey BASED ON Userid IN TAKE SURVEY PAGE
app.post('/gettingcompletedsurvey',(req,res)=>{
    console.log("request",req.body);
//sconsole.log(req.body[0].department)

dbo.collection("responsefromuser").find({userid:{$eq:req.body[0].EmployeeID}}).toArray((err,completedsurvey)=>{
    if(err){
        console.log(err);
    }else{
        res.json({message:"completedsurvey Found",completedsurvey});
    }
});

});

//getting completed survey form based on test name and user id
app.post('/gettingcompletedsurveyform',(req,res)=>{
    console.log("request626",req.body);
//sconsole.log(req.body[0].department)

    dbo.collection("responsefromuser").find({$and:[{testName:{$eq:req.body[0].testName}},{userid:{$eq:req.body[0].EmployeeID}}]}).toArray((err,survey)=>{
        if(err){
            console.log(err);
        }        
        else{
            console.log("completedsurvey.length 612",survey.length);
            res.json({message:"survey Found",survey});
        }
    });
    
});
//End of getting completed survey form based on test name and user id




//Getting SURVEY BASED ON TESTNAME
app.post('/gettingsurvey',(req,res)=>{
    console.log("request595",req.body);
//sconsole.log(req.body[0].department)

    dbo.collection("createsurvey").find({testName:{$eq:req.body[0].testName}}).toArray((err,survey)=>{
        if(err){
            console.log(err);
        }
        // else if(completedsurvey.length === 0){
        //     console.log("completedsurvey.length 602",completedsurvey.length);
        //     dbo.collection("createsurvey").find({testName:{$eq:req.body[0].testName}}).toArray((err,survey)=>{
        //         if(err){
        //             console.log(err);
        //         }else{
        //             res.json({message:"survey Found",survey});
        //         }
        //     });
        //     //res.json({message:"survey Found",survey});
        // }
        else{
            console.log("completedsurvey.length 612",survey.length);
            res.json({message:"survey Found",survey});
        }
    });
    
});

///Submitting the SURVEY FROM USER and ADMIN
app.post('/submitsurvey',(req,res)=>{
    //console.log("assignquestiontouser==>",req.body);
    
    dbo.collection('responsefromuser').insertMany(req.body,(err,dataArray)=>
    {
        if(err)
        {
            //console.log('error in sending')
            //console.log(err)
            res.json({message:"You have already submitted the survey !!"});
        }
        else
        {
            res.json({message:"Survey Submitted Successfully"});
        }
    });
    
    
    });
    



//port number

app.listen(process.env.PORT ||8080,()=>
{
    console.log(`server is running on port 8080`)
});





