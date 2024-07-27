"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const admin_1 = __importDefault(require("../db/admin"));
const user_1 = __importDefault(require("../db/user"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
var adminAuthentication = (req, res, next) => {
    var username = req.headers.username;
    var password = req.headers.password;
    console.log(req.body);
    admin_1.default.findOne({ username: username, password: password })
        .then((admin) => {
        if (admin) {
            console.log('control in admin authentication');
            console.log('admin found in database while logging in');
            req.admin = admin.toObject();
            next();
        }
        else {
            res.status(403).json({ message: 'Admin authentication failed' });
        }
    })
        .catch(error => {
        console.error(error);
    });
};
var authenticateAdminJwtToken = (req, res, next) => {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, admin) => {
            if (err) {
                res.status(403).json({ message: 'invalid token' });
            }
            else {
                req.admin = admin;
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: 'authHeader empty' });
    }
};
var userAuthentication = (req, res, next) => {
    console.log('control at userAuthentication');
    user_1.default.findOne({ username: req.headers.username, password: req.headers.password })
        .then((user) => {
        if (user) {
            console.log('user found in database while logging in');
            req.user = user.toObject();
            next();
        }
        else {
            res.status(403).json({ message: 'wrong username or password' });
        }
    })
        .catch(error => {
        console.error(error);
    });
};
var authenticateUserJwtToken = (req, res, next) => {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'invalid jwt token' });
            }
            else {
                console.log('control in authenticateUserJwtToken');
                console.log(user);
                req.user = user;
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: 'authHeader empty' });
    }
};
exports.default = {
    adminAuthentication,
    authenticateAdminJwtToken,
    userAuthentication,
    authenticateUserJwtToken
};
