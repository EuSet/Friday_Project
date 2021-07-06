import {resetPasswordApi} from "../../api/resetPasswordApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


type ResetInitialStateType = {
    isSent: boolean
    error: string
    isCreate: boolean
    isLoader: boolean
}
const initialState: ResetInitialStateType = {
    isSent: false,
    error: '',
    isCreate: false,
    isLoader: false
}

export const forgotPasswordThunk = createAsyncThunk(
    'reset/forgotPasswordThunk',
    async (email: string, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoader({isLoader:true}))
            await resetPasswordApi.sendInstructions(email)
            return {isSent: true}
        } catch (e) {
            dispatch(setError({error:'something wrong'}))
            return rejectWithValue('')
        } finally {
            dispatch(setLoader({isLoader:false}))
        }
    }
)
export const createNewPasswordThunk = createAsyncThunk(
    'reset/createNewPasswordThunk',
    async (params:{password: string, resetPasswordToken: string}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoader({isLoader:true}))
            await resetPasswordApi.setNewPassword(params.password, params.resetPasswordToken)
            return {isCreate:true}
        } catch (e) {
            dispatch(setError({error:'something wrong'}))
            return rejectWithValue('')
        }
        finally {
            dispatch(setLoader({isLoader:false}))
        }
    }
)
const resetSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {
        setLoader(state, action:PayloadAction<{isLoader: boolean}>){
            state.isLoader = action.payload.isLoader
        },
        setError(state, action:PayloadAction<{error:string}>){
            state.error = action.payload.error
        },
        isSentInstructions(state, action:PayloadAction<{isSent:boolean}>){
          state.isSent = action.payload.isSent
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgotPasswordThunk.fulfilled, (state, action) => {
            state.isSent = action.payload.isSent
        })
    }
})
export const resetReducer = resetSlice.reducer
export const {setLoader, setError, isSentInstructions} = resetSlice.actions

