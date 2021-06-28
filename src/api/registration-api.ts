import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

// types
export type userRegType = {
  email: string
  password: string
}

// registration api

export const authAPI = {
  registration(payload: userRegType) {
    return instance.post<any>(`auth/register`, payload)
  },
}
