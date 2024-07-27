import { Request } from "express"
import {ADMIN} from "../db/admin"
import {USER} from '../db/user'

declare module 'express-serve-static-core' {
    interface Request {
        admin?:ADMIN;
        user?:USER;
    }
}