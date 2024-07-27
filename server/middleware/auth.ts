import { Request,Response,NextFunction } from 'express';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import ADMIN from '../db/admin'
import USER from '../db/user'


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret'

var adminAuthentication = (req:Request, res:Response, next:NextFunction) => {
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
  
  var authenticateAdminJwtToken = (req:Request,res:Response,next:NextFunction)=>{
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if(token){
      jwt.verify(token,accessTokenSecret,(err,admin)=>{
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
  
  var userAuthentication = (req:Request,res:Response,next:NextFunction)=>{
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
  
  var authenticateUserJwtToken = (req:Request,res:Response,next:NextFunction)=>{
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if(token){
      jwt.verify(token, accessTokenSecret, (err,user)=>{
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

  export default{
    adminAuthentication,
    authenticateAdminJwtToken,
    userAuthentication,
    authenticateUserJwtToken
  }