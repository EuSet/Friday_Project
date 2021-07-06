import {loginReducer, loginTC} from "./login-reducer";

test('user data should be added', () => {
    const initialState = {
        isLoggedIn: false,
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error:''
    }
    const data = {
        userData:{
            _id: '1',
            email: '2',
            name: '3',
            avatar: '4',
            publicCardPacksCount: 0,
            created: '5',
            updated: '6',
            isAdmin: false,
            verified: false,
            rememberMe: false,
        },
        isLoggedIn:true
    }
    const param = {email:'email', password:'123', rememberMe:true}
    const newState = loginReducer(initialState, loginTC.fulfilled(data, '', param))
    expect(newState.isLoggedIn).toBeTruthy()
    expect(newState._id).toBe('1')
})
