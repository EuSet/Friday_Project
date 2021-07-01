import { Dispatch } from 'redux'
import { authAPI } from '../../api/registration-api'
import { setAppStatusAC } from '../../app/app-reducer'

export const authActions = {
  SIGN_UP: 'AUTH/SIGN_UP',
}

export type AuthActionsType = signUpAT
const initState = {
  userRegistrationData: {
    email: '',
    password: '' 
  },
}

// types
type signUpAT = ReturnType<typeof signUpAC>
type AuthInitialStateType = typeof initState

//

export const authReducer = (
  state: AuthInitialStateType = initState,
  action: AuthActionsType
): AuthInitialStateType => {
  switch (action.type) {
    case authActions.SIGN_UP:
      return {
        ...state,
        userRegistrationData: {
          email: action.email,
          password: action.password,
        },
      }
    default:
      return state
  }
}

export const signUpAC = (emailValue: string, passwordValue: string) =>
  ({
    type: authActions.SIGN_UP,
    email: emailValue,
    password: passwordValue,
  } as const)

export const singUp =
  (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .registration({ email, password })
      .then(res => {
        dispatch(signUpAC(email, password))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        dispatch(setAppStatusAC('failed'))
        alert(error)
      })
  }
