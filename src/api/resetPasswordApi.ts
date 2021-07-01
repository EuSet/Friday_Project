import axios from "axios";

const settings = {
    withCredentials: true,
}
//{"addedUser":{"_id":"60d6e396d5086f000458d130","email":"setskoeugene@inbox.ru","rememberMe":false,"isAdmin":false,"name":"setskoeugene@inbox.ru","verified":false,"publicCardPacksCount":0,"created":"2021-06-26T08:21:42.411Z","updated":"2021-06-26T08:21:42.411Z","__v":0}}
//https://fridayproject.herokuapp.com/2.0/
//https://neko-back.herokuapp.com/2.0/
export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})
type resetResponseType = {
    info: string
    error:string
}
export type authResponseType = {
    id: string
    email: string
    name:string
    avatar?:string
    publicCardPacksCount: number
}
export const resetPasswordApi = {
    sendInstructions(email:string) {
        return instance.post<resetResponseType>('auth/forgot', {email})
    },
    setNewPassword(password:string, resetPasswordToken:string) {
        return instance.post<resetResponseType>('auth/set-new-password',{password, resetPasswordToken})
    }
}
export const profileApi = {
    authMe() {
    return instance.post<authResponseType>('auth/me', {})
    }
}
