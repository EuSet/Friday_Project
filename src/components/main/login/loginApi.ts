import axios from 'axios'
import {LoginParamsType, loginResponseType} from "../../../redux/login-reducer/login-reducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
})
// baseURL: 'https://neko-back.herokuapp.com/2.0/'
//http://localhost:7542/2.0/

export const authApi = {

    login(data: LoginParamsType) {
        return instance.post<loginResponseType>(('auth/login'), data)
    },
    logOut() {
        return instance.delete(`auth/me`)
    },
    authMe() {
        return instance.post<loginResponseType>(`auth/me`) // проверка на залогиненность
    }
}