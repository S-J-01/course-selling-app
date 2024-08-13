import { atom } from "recoil";


interface userState{
    isLoading: boolean;
    username: string | null;
}
export const userState = atom<userState>({
    key: 'userState',
    default:{
        isLoading:true,
        username:null
    }
})