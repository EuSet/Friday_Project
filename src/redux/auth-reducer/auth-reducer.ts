import { Dispatch } from 'redux'
import { authAPI } from '../../api/registration-api'

export const authActions = {
  SIGN_UP: 'AUTH/SIGN_UP',
}

export type AuthActionsType = signUpAT
const initState = {
  userRegistrationData: {
    email: ('' as string) || null,
    password: ('' as string) || null,
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
    authAPI
      .registration({ email, password })
      .then(res => {
        dispatch(signUpAC(email, password))
      })
      .catch(error => alert(error))
  }

