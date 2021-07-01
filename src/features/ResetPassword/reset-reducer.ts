import {AppThunk} from "../../app/store";
import {resetPasswordApi} from "../../api/resetPasswordApi";
import { setAppStatusAC } from "../../app/app-reducer";


const IS_SENT = 'reset/IS_SENT'
const SET_ERROR = 'reset/SET_ERROR'
const IS_CREATE_NEW_PASSWORD = 'reset/IS_CREATE_NEW_PASSWORD'
const SET_LOADER = 'reset/SET_LOADER'

type ResetInitialStateType = {
    isSent: boolean
    error: string
    isCreate: boolean
    isLoader: boolean
}
export type ResetActionsType = ReturnType<typeof isSentInstructions>
    | ReturnType<typeof setError>
    | ReturnType<typeof isCreateNewPassword>
    | ReturnType<typeof setLoader>
const initState: ResetInitialStateType = {
    isSent: false,
    error: '',
    isCreate: false,
    isLoader: false
}
export const resetReducer = (state: ResetInitialStateType = initState, action: ResetActionsType): ResetInitialStateType => {
    switch (action.type) {
        case "reset/IS_SENT":
        case "reset/SET_ERROR":
        case "reset/IS_CREATE_NEW_PASSWORD":
        case "reset/SET_LOADER":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const isSentInstructions = (isSent: boolean) => {
    return {type: IS_SENT, payload: {isSent: isSent}} as const
}
export const setError = (error: string) => {
    return {type: SET_ERROR, payload: {error}} as const
}
export const setLoader = (isLoader: boolean) => {
    return {type: SET_LOADER, payload: {isLoader}} as const
}
export const isCreateNewPassword = (isCreate: boolean) => {
    return {type: IS_CREATE_NEW_PASSWORD, payload: {isCreate}} as const
}
export const forgotPasswordThunk = (email: string): AppThunk => async (dispatch) => {
   
    try {
        dispatch(setLoader(true))
        await resetPasswordApi.sendInstructions(email)
        dispatch(isSentInstructions(true))
    } catch (e) {
        dispatch(setError('something wrong'))
    }
    dispatch(setLoader(false))
}
export const createNewPasswordThunk = (password: string, resetPasswordToken: string)
    : AppThunk => async (dispatch) => {
    try {
        dispatch(setLoader(true))
        await resetPasswordApi.setNewPassword(password, resetPasswordToken)
        dispatch(isCreateNewPassword(true))
    } catch (e) {
        dispatch(setError('something wrong'))
    }
    dispatch(setLoader(false))
}
