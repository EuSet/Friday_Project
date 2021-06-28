import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer/auth-reducer";
import {profileReducer} from "./profile-reducer/profile-reducer";
import {loginReducer} from "./login-reducer/login-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    login:loginReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
// export type AppActionsType = AuthActionsType | ProfileActionsType
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
export const store = createStore(rootReducer, applyMiddleware(thunk))
