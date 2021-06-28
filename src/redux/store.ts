import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './auth-reducer/auth-reducer'
import { profileReducer } from './profile-reducer/profile-reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
})
export type AppRootState = ReturnType<typeof rootReducer>
// export type AppActionsType = AuthActionsType | ProfileActionsType
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
