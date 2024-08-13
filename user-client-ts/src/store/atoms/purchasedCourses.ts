import { atom } from "recoil";
import { Course } from "../../types/course";

interface purchasedCoursesState{
    isLoading: boolean;
    allPurchasedCourses: Course[];
}

export const purchasedCoursesState = atom<purchasedCoursesState>({
    key:'purchasedCoursesState',
    default:{
        isLoading:true,
        allPurchasedCourses:[]
    }
})