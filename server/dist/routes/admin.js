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
const admin_1 = __importDefault(require("../db/admin"));
const course_1 = __importDefault(require("../db/course"));
const auth_1 = __importDefault(require("../middleware/auth"));
const common_1 = require("@shreyasjaltare/common");
const { adminAuthentication, authenticateAdminJwtToken } = auth_1.default;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
router.post('/signup', (req, res) => {
    // logic to sign up admin
    const parsedInput = common_1.signupInputProp.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ message: parsedInput.error });
    }
    const newAdmin = new admin_1.default({
        username: parsedInput.data.username,
        password: parsedInput.data.password
    });
    newAdmin.save().then(resp => {
        console.log('newly signed up admin saved to DB', resp);
    });
    var accessToken = jsonwebtoken_1.default.sign(newAdmin.toObject(), accessTokenSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'admin signed up successfully', token: accessToken });
});
router.post('/login', adminAuthentication, (req, res) => {
    // logic to log in admin
    var admin = req.admin;
    var accessToken = jsonwebtoken_1.default.sign(admin, accessTokenSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'admin login successful', token: accessToken });
});
router.post('/courses', authenticateAdminJwtToken, (req, res) => {
    // logic to create a course
    const newCourse = new course_1.default({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published,
        courseID: Math.floor(Math.random() * 1000) + 1
    });
    newCourse.save().then(resp => {
        console.log('new course saved to DB', resp);
    });
    res.status(200).json({ message: 'course created successfully', courseID: newCourse.courseID });
});
router.put('/courses/:courseId', authenticateAdminJwtToken, (req, res) => {
    // logic to edit a course
    var courseID = req.params.courseId;
    course_1.default.findOne({ courseID: courseID })
        .then((course) => {
        if (course) {
            console.log('course found in database');
            course.title = req.body.title;
            course.description = req.body.description;
            course.price = req.body.price;
            course.imageLink = req.body.imageLink;
            course.published = req.body.published;
            course.save().then((resp) => {
                console.log('course saved to DB after updating', resp);
            });
            res.status(200).json({ message: 'course updated successfully' });
        }
        else {
            res.status(404).json({ message: 'wrong course ID' });
        }
    })
        .catch(error => {
        console.error(error);
    });
});
router.get('/courses', authenticateAdminJwtToken, (req, res) => {
    // logic to get all courses
    course_1.default.find()
        .then((course) => {
        res.status(200).json({ courses: course });
    });
});
router.get('/me', authenticateAdminJwtToken, (req, res) => {
    //logic to get the username if admin is logged in and render the navigation bar accordingly
    var admin = req.admin;
    res.status(200).json({ username: admin.username });
});
exports.default = router;
