import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer} from "./auth-reducer/auth-reducer";
import {ProfileActionsType, profileReducer} from "./profile-reducer/profile-reducer";
import {loginReducer} from "./login-reducer/login-reducer";
import {ResetActionsType, resetReducer} from "./auth-reducer/reset-reducer";

const rootReducer = combineReducers({
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
