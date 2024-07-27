"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../db/user"));
const course_1 = __importDefault(require("../db/course"));
const auth_1 = __importDefault(require("../middleware/auth"));
const { userAuthentication, authenticateUserJwtToken } = auth_1.default;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
router.post('/signup', (req, res) => {
    // logic to sign up user
    const newUser = new user_1.default({
        username: req.body.username,
        password: req.body.password,
        purchasedCourses: []
    });
    newUser.save().then((resp) => {
        console.log('new user saved in database', resp);
    });
    var accessToken = jsonwebtoken_1.default.sign(newUser.toObject(), accessTokenSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'user signed up successfully', token: accessToken });
});
router.post('/login', userAuthentication, (req, res) => {
    // logic to log in user
    var accessToken = jsonwebtoken_1.default.sign(req.user, accessTokenSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'user logged in successfully', token: accessToken });
});
router.get('/courses', authenticateUserJwtToken, (req, res) => {
    // logic to list all courses
    course_1.default.find()
        .then((course) => {
        res.status(200).json({ courses: course });
    });
});
router.post('/courses/:courseId', authenticateUserJwtToken, (req, res) => {
    // logic to purchase a course
    console.log('control inside purchase course endpoint');
    var courseID = req.params.courseId;
    var loggedInUser = req.user;
    console.log('this is logged in user', loggedInUser);
    course_1.default.findOne({ courseID: courseID })
        .then((course) => {
        if (course) {
            //query from db here and update
            //loggedInUser.purchasedCourses.push(course);
            // loggedInUser.save().then((resp)=>{
            // console.log('user saved to DB after purchasing course',resp);
            // res.status(200).json({message:'course purchased successfully'});
            // })
            user_1.default.updateOne({ username: loggedInUser.username, password: loggedInUser.password }, { $push: { purchasedCourses: course } }).then(result => {
                console.log('purchased course added to User and saved to DB', result);
                res.status(200).json({ message: 'Course purchased successfully' });
            });
            // console.log('user saved to DB after purchasing course');
            // res.status(200).json({message:'course purchased successfully'});
        }
        else {
            res.status(403).json({ message: 'wrong course ID' });
        }
    })
        .catch(error => {
        console.error(error);
    });
});
router.get('/purchasedCourses', authenticateUserJwtToken, (req, res) => {
    // logic to view purchased courses
    user_1.default.findOne({ username: req.user.username, password: req.user.password })
        .populate('purchasedCourses')
        .then(user => {
        if (user) {
            console.log('user found in DB');
            res.status(200).json({ purchasedCourses: user.purchasedCourses });
        }
        else {
            console.log('user is null');
            res.status(404).json({ message: 'user not found' });
        }
    });
    //res.status(200).json({purchasedCourses:req.user.purchasedCourses});
});
router.get('/me', authenticateUserJwtToken, (req, res) => {
    //logic to get the username if user is logged in and render the navigation bar accordingly
    var user = req.user;
    res.status(200).json({ username: user.username });
});
exports.default = router;
