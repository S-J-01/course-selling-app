const express = require('express')

const router = express.Router()

router.post('/signup', (req, res) => {
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
  
  router.post('/login',userAuthentication, (req, res) => {
    // logic to log in user
    var accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
    res.status(200).json({message:'user logged in successfully',token:accessToken});
  });
  
  router.get('/courses',authenticateUserJwtToken, (req, res) => {
    // logic to list all courses
    COURSE.find()
    .then((course)=>{
      res.status(200).json({courses:course});
    })
  });
  
  router.post('/courses/:courseId',authenticateUserJwtToken, (req, res) => {
    // logic to purchase a course
    console.log('control inside purchase course endpoint')
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
  
  router.get('/purchasedCourses',authenticateUserJwtToken, (req, res) => {
    // logic to view purchased courses
    USER.findOne({username:req.user.username,password:req.user.password})
    .populate('purchasedCourses')
    .then(user=>{
      console.log('user found in DB');
      res.status(200).json({purchasedCourses:user.purchasedCourses});
    })
    //res.status(200).json({purchasedCourses:req.user.purchasedCourses});
  });
  
  router.get('/me',authenticateUserJwtToken,(req,res)=>{
    //logic to get the username if user is logged in and render the navigation bar accordingly
   
    var user = req.user
    res.status(200).json({username:user.username})
   })

   module.exports = router