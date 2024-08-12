import { atom } from "recoil";

export const purchasedCoursesState = atom({
    key:'purchasedCoursesState',
    default:{
        isLoading:true,
        allPurchasedCourses:[]
    }
})