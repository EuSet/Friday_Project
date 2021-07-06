import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  error: null,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    }
  }
})
export const appReducer = appSlice.reducer
export const {setAppStatusAC} = appSlice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
}




