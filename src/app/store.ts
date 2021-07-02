import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer} from "../features/Registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "../features/Profile/profile-reducer";
import {loginReducer} from "../features/Login/login-reducer";
import {ResetActionsType, resetReducer} from "../features/ResetPassword/reset-reducer";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login:loginReducer,
    profile: profileReducer,
    reset: resetReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = ResetActionsType | ProfileActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
