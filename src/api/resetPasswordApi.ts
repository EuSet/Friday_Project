import axios from "axios";

const settings = {
    withCredentials: true,
}

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
