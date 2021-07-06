import {authAPI} from '../../api/registration-api'
import {setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    userRegistrationData: {
        email: '',
        password: ''
    },
}
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (params: { email: string, password: string }, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            await authAPI.registration({email: params.email, password: params.password})
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {email: params.email, password: params.password}
        } catch (e) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue('')
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.userRegistrationData = action.payload
        })
    }
})

export const authReducer = authSlice.reducer



