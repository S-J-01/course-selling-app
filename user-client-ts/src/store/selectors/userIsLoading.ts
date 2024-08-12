import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userIsLoading = selector({
    key: 'userIsLoading',
    get:({get})=>{
        const state = get(userState)

        return state.isLoading
    }
})