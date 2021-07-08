import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../features/Registration/registration-reducer";
import {loginReducer} from "../features/Login/login-reducer";
import {resetReducer} from "../features/ResetPassword/reset-reducer";
import {appReducer} from "./app-reducer";
import {packListReducer} from "../features/Packs/packlist-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login:loginReducer,
    reset: resetReducer,
    packs: packListReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(thunk)
})

