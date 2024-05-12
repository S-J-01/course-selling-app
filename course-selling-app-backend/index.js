const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mloyycz.mongodb.net/course_app_database?retryWrites=true&w=majority&appName=Cluster0`);
app.use(express.json());
const ADMIN = require('./admin');
const COURSE = require ('./course');
const USER = require('./user');




var adminAuthentication = (req, res, next) => {
  var username = req.headers.username;
  var password  = req.headers.password;
  console.log(req.body);

  ADMIN.findOne({username:username, password:password})
  .then((admin)=>{
    if(admin){
      console.log('control in admin authentication')
      console.log('admin found in database while logging in');
      req.admin=admin.toObject();
      next();

    }else{
      res.status(403).json({message:'Admin authentication failed'});
    }
  })
  .catch(error =>{
    console.error(error);
  })
};

var authenticateAdminJwtToken = (req,res,next)=>{
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(' ')[1];
  if(token){
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,admin)=>{
   if (err) {
     res.status(403).json({message:'invalid token'});

   }else{
     req.admin=admin;
     next();
   }
  });
 }else{
   res.status(401).json({message:'authHeader empty'});
 }
 };

var userAuthentication = (req,res,next)=>{
  console.log('control at userAuthentication');
 USER.findOne({username:req.headers.username, password:req.headers.password})
 .then((user)=>{
  if(user){
    console.log('user found in database while logging in');
    req.user = user.toObject();
    next();
  }else{
    res.status(403).json({message:'wrong username or password'});
  }

 })
 .catch(error=>{
  console.error(error);
 })
};

var authenticateUserJwtToken = (req,res,next)=>{
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(' ')[1];
  if(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
      if(err){
        res.status(403).json({message:'invalid jwt token'});
      }else{
        console.log('control in authenticateUserJwtToken');
        console.log(user);
        req.user = user;
        next();
      }
    })
  }else{
    res.status(403).json({message:'authHeader empty'});
  }
}
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const newAdmin = new ADMIN({
   username : req.body.username,
   password : req.body.password
  });

  newAdmin.save().then(resp=>{
    console.log('newly signed up admin saved to DB',resp);
  })

  var accessToken = jwt.sign(newAdmin.toObject(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
  res.status(200).json({message:'admin signed up successfully',token:accessToken});
});

app.post('/admin/login',adminAuthentication, (req, res) => {
  // logic to log in admin
  var admin = req.admin;
  var accessToken = jwt.sign(admin,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
  res.status(200).json({message:'admin login successful', token:accessToken});
});

app.post('/admin/courses',authenticateAdminJwtToken, (req, res) => {
  // logic to create a course
  const newCourse = new COURSE({
    title : req.body.title,
    description:req.body.description,
    price:req.body.price,
    imageLink:req.body.imageLink,
    published:req.body.published,
    courseID:Math.floor(Math.random() * 1000) + 1
  });
  newCourse.save().then(resp=>{
    console.log('new course saved to DB',resp);
  })
  res.status(200).json({message:'course created successfully', courseID:newCourse.courseID});
});

app.put('/admin/courses/:courseId',authenticateAdminJwtToken, (req, res) => {
  // logic to edit a course
  var courseID= req.params.courseId;
  COURSE.findOne({courseID:courseID})
  .then((course)=>{
    if(course){
      console.log('course found in database');
      course.title=req.body.title;
      course.description=req.body.description;
      course.price=req.body.price;
      course.imageLink=req.body.imageLink;
      course.published=req.body.published;
      course.save().then((resp)=>{
        console.log('course saved to DB after updating',resp);
      })
      res.status(200).json({message:'course updated successfully'});
    }else{
      res.status(404).json({message:'wrong course ID'});
    }
  })
  .catch(error=>{
    console.error(error);
  })


});

app.get('/admin/courses',authenticateAdminJwtToken, (req, res) => {
  // logic to get all courses
  COURSE.find()
  .then((course)=>{
    res.status(200).json({courses:course})
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  
  const newUser = new USER({
    username : req.body.username,
    password : req.body.password,
    purchasedCourses : []
  });

  newUser.save().then((resp)=>{
    console.log('new user saved in database',resp);
  })

  var accessToken = jwt.sign(newUser.toObject(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
  res.status(200).json({message:'user signed up successfully',token:accessToken});

});

app.post('/users/login',userAuthentication, (req, res) => {
  // logic to log in user
  var accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
  res.status(200).json({message:'user logged in successfully',token:accessToken});
});

app.get('/users/courses',authenticateUserJwtToken, (req, res) => {
  // logic to list all courses
  COURSE.find()
  .then((course)=>{
    res.status(200).json({courses:course});
  })
});

app.post('/users/courses/:courseId',authenticateUserJwtToken, (req, res) => {
  // logic to purchase a course
  var courseID = req.params.courseId;
  var loggedInUser = req.user;
  console.log('this is logged in user',loggedInUser);
  COURSE.findOne({courseID:courseID})
  .then((course)=>{
    if(course){
      //query from db here and update
      //loggedInUser.purchasedCourses.push(course);
      // loggedInUser.save().then((resp)=>{
      // console.log('user saved to DB after purchasing course',resp);
      // res.status(200).json({message:'course purchased successfully'});
      // })
      USER.updateOne({username:loggedInUser.username,password:loggedInUser.password},
      {$push:{purchasedCourses:course}},
    ).then(result=>{
        console.log('purchased course added to User and saved to DB',result);
        res.status(200).json({message:'Course purchased successfully'});
    })
    // console.log('user saved to DB after purchasing course');
    // res.status(200).json({message:'course purchased successfully'});
    }else{
      res.status(403).json({message:'wrong course ID'});
    }
  })
  .catch(error=>{
    console.error(error);
  })
});

app.get('/users/purchasedCourses',authenticateUserJwtToken, (req, res) => {
  // logic to view purchased courses
  USER.findOne({username:req.user.username,password:req.user.password})
  .populate('purchasedCourses')
  .then(user=>{
    console.log('user found in DB');
    res.status(200).json({purchasedCourses:user.purchasedCourses});
  })
  //res.status(200).json({purchasedCourses:req.user.purchasedCourses});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
