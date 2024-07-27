"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mloyycz.mongodb.net/course_app_database?retryWrites=true&w=majority&appName=Cluster0`);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
app.use('/admin', admin_1.default);
app.use('/users', user_1.default);
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
