const jwt = require('jsonwebtoken');
require('dotenv').config();
const ADMIN = require('../db/admin')
const USER = require('../db/user')


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

  module.exports ={
    adminAuthentication,
    authenticateAdminJwtToken,
    userAuthentication,
    authenticateUserJwtToken
  }