import {setAppStatusAC} from '../../app/app-reducer';
import {authApi} from "../../api/loginApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error:''
}


export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authApi.login(data)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {userData:res.data, isLoggedIn:true}
        } catch (e) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue('')
        }
    }
)
export const logOutTC = createAsyncThunk(
    'login/logOutTC',
    async (param, {dispatch, rejectWithValue}) => {

        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            await authApi.logOut()
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn:false}
        } catch (e) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue('')
        }
    }
)
export const getUserDataTC = createAsyncThunk(
    'login/getUserDataTC',
    async (param, {dispatch,rejectWithValue}) => {
        try {
            const res = await authApi.authMe()
            let { _id, email, name, avatar } = res.data
            dispatch(setUser({_id, email, name, avatar}))
            return {isLoggedIn:true}
            /*return {userData:res.data, isLoggedIn:true}*/
        } catch (e) {
            rejectWithValue('')
        }

    }
)
const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setUser(state, action:PayloadAction<{_id: string, email: string, name: string, avatar: string}>){
            state._id = action.payload._id
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.email = action.payload.email
            state.isLoggedIn = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })
        builder.addCase(logOutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
       /* builder.addCase(getUserDataTC.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })*/
    }
})

export const loginReducer = loginSlice.reducer
export const {setUser} = loginSlice.actions
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
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
