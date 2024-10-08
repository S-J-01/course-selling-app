
import express,{Request,Response} from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import ADMIN from '../db/admin'
import COURSE from '../db/course'
import auth from '../middleware/auth'
import {z} from 'zod'
import {signupInputProp} from "@shreyasjaltare/common"

const { adminAuthentication, authenticateAdminJwtToken} =auth;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret'


router.post('/signup', (req:Request, res:Response) => {
    // logic to sign up admin
    const parsedInput = signupInputProp.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(411).json({message:parsedInput.error})
    }

    const newAdmin = new ADMIN({
     username : parsedInput.data.username,
     password : parsedInput.data.password
    });
  
    newAdmin.save().then(resp=>{
      console.log('newly signed up admin saved to DB',resp);
    })
  
    var accessToken = jwt.sign(newAdmin.toObject(),accessTokenSecret,{expiresIn:'1h'});
    res.status(200).json({message:'admin signed up successfully',token:accessToken});
  });
  
  router.post('/login',adminAuthentication, (req:Request, res:Response) => {
    // logic to log in admin
    var admin = req.admin;
    var accessToken = jwt.sign(admin,accessTokenSecret,{expiresIn:'1h'});
    res.status(200).json({message:'admin login successful', token:accessToken});
  });
  
  router.post('/courses',authenticateAdminJwtToken, (req:Request, res:Response) => {
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
  
  router.put('/courses/:courseId',authenticateAdminJwtToken, (req:Request, res:Response) => {
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
  
  router.get('/courses',authenticateAdminJwtToken, (req:Request, res:Response) => {
    // logic to get all courses
    COURSE.find()
    .then((course)=>{
      res.status(200).json({courses:course})
    })
  });
  
  
  router.get('/me',authenticateAdminJwtToken,(req:Request,res:Response)=>{
   //logic to get the username if admin is logged in and render the navigation bar accordingly
  
   var admin = req.admin
   res.status(200).json({username:admin.username})
  })

  export default router