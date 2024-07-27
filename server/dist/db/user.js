"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    purchasedCourses: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'COURSE'
        }]
});
exports.default = mongoose_1.default.model('USER', userSchema);
