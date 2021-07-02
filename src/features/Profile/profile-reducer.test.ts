import {ProfileInitialStateType, profileReducer, setAuthData} from "./profile-reducer";
import {authResponseType} from "../../api/resetPasswordApi";

let initialState:ProfileInitialStateType;
beforeEach(() => {
    initialState = {
        id: '',
        email: '',
        name:'',
        avatar:'',
        publicCardPacksCount: null
    }
})

test('auth data should be added', () => {
    const data:authResponseType = {email:'blabla@gmail.com', id:'1', name:'Eugene', publicCardPacksCount:1}
    const action = setAuthData(data)
    const newState = profileReducer(initialState, action)
    expect(newState.id).toBe('1')
    expect(newState.name).toBe('Eugene')
    expect(newState.publicCardPacksCount).toBeTruthy()
})
