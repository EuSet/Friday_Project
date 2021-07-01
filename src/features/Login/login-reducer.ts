import { setAppStatusAC, SetAppStatusActionType } from './../../app/app-reducer';
import {Dispatch} from "redux";
import {authApi} from "../../api/loginApi";


const initialState = {
    isLoggedIn: false,
    name: '',
    avatar: '',
    error:''
}

type InitialStateType = typeof initialState

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type loginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type setUserDataACType = ReturnType<typeof setUserDataAC>
export type setUserNameACType = ReturnType<typeof setUserNameAC>
export type setUserAvatarACType = ReturnType<typeof setUserAvatarAC>



type ActionsType = setIsLoggedInACType  | setUserDataACType | setUserNameACType | setUserAvatarACType


export const loginReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
        return {...state, isLoggedIn: action.value}
       case "login/SET_USER":
            return {...state, ...action.payload}
        case "login/SET-NAME":
            return {...state, name: action.name}
        case "login/SET-AVATAR":
            return {...state, avatar: action.avatar}

        default:
            return state
}}



export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setUserNameAC = (name: string) => ({type: 'login/SET-NAME', name} as const)
export const setUserAvatarAC = (avatar: string) => ({type: 'login/SET-AVATAR', avatar} as const)
export const setUserDataAC = (name: string, isLoggedIn: boolean) => ({
    type: 'login/SET_USER',
    payload: {name, isLoggedIn}
} as const)



export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType > ) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
              dispatch(setIsLoggedInAC(true))
              dispatch(setUserNameAC(res.data.name))
              dispatch(setUserAvatarAC(res.data.avatar))
              dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch(err => {
            const error = err.response
                    ? err.response.data.error
                : (err.message + ', more details in the console');
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logOut()
        .then(() => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        })
}


export const getUserDataTC = () => (dispatch: Dispatch) => {

    authApi.authMe()
        .then(res => {
            dispatch(setUserDataAC(res.data.name, true))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}
