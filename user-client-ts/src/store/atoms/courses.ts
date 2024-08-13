import { atom } from "recoil";
import { Course } from "../../types/course";

interface CourseState{
    isLoading:boolean;
    allCourses: Course[];
}

export const courseState = atom<CourseState>({
    key:'courseState',
    default:{
        isLoading:true,
        allCourses:[]
    }
})