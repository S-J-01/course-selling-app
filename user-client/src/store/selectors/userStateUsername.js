import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userStateUsername = selector({
    key: 'userStateUsername',
    get:({get})=>{
        const state = get(userState)

        return state.username
    }
})