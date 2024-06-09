var mysql= require("mysql");
var express= require("express");
var bodyparser=require("body-parser");
var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

//starting page
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

//to send insert form
app.get('/insertData',function(req,res){
    res.sendFile(__dirname+"/insertdoc.html");
});


//to send page to show options page
app.post('/showpage',function(req,res){
    res.sendFile(__dirname+"/show.html");
});

//shows data of one student
app.post('/showOne',function(req,res){
    var rollno=req.body.rollnos;
    var con=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Harish@2002",
            database:"harish",
        });
        con.connect(function(error){
            if(error) console.log(error);
            var sql= "select * from students where rollno=?";
            con.query(sql,rollno,function(error,result){
                if(error) console.log(error);
                res.render(__dirname+"/showdataone",{students:result});
            });
        });
    

});


//for inserting data
app.post('/submitform',function(req,res){
   var name= req.body.name;
   var rollno=req.body.rollno;
   var bloodg=req.body.bloodGroup;
   var result= req.body.result;
   var con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Harish@2002",
        database:"harish",
       });


    con.connect(function(err){
        if(err)throw err;
        var sql1="select *from students where rollno=?";
        var sql="insert into students(rollno,name,bloodGroup,result) values ('"+rollno+"','"+name+"','"+bloodg+"','"+result+"')";
        con.query(sql1,rollno,function(err,result){
           if(err)throw err;
           if(result.length>0) 
                res.send("student already registered with the given roll no!!");
           else{
                con.query(sql,function(err,result){
                if(err) throw err;
                res.send("student registered successfully!!");
                });
            }
        });
    
    });
});
//shows all the data in the table
app.get('/showAllData', function(req,res){
    var con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Harish@2002",
        database:"harish",
    });
    con.connect(function(error){
        if(error) console.log(error);
        var sql= "select * from students";
        con.query(sql,function(error,result){
            if(error) console.log(error);
            res.render(__dirname+"/showall",{students:result});
        });
    });
});

app.listen(7000);



