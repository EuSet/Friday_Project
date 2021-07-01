import React, {useState} from "react";
import c from '../../common/commonStyle/commonStyle.module.css'
import s from "./login.module.css"
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {loginTC} from "../../../redux/login-reducer/login-reducer";
import {AppRootState} from "../../../redux/store";


export const Login = () => {
    const dispatch = useDispatch()

    let [email, setEmail] = useState<string>('nya-admin@nya.nya')
    let [password, setPassword] = useState<string>('1qazxcvBG')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)

    if (isLoggedIn) return <Redirect to={'/profile'}/>

    return (
        <div className={c.wrap}>
            <div className={c.formBlock}>

                <div>
                    <h3>Sign In</h3>
                </div>
                <div>
                    {/*<span>Email</span>*/}
                    <SuperInputText onChangeText={(value) => {
                        setEmail(value)
                    }}
                                    value={email}/>
                </div>
                <div>
                    {/* <span>Password</span>*/}
                    <SuperInputText type={"password"}
                                    onChangeText={(value) => {
                                        setPassword(value)
                                    }}
                                    value={password}/>
                </div>

                <div className={c.textWrap}>
                    <span>Remember me</span>
                    <SuperCheckbox checked={rememberMe}
                                   onChangeChecked={(value) => {
                                       setRememberMe(value)
                                   }}/>
                </div>

                <div>
                    <SuperButton onClick={() => {
                        dispatch(loginTC({email, password, rememberMe}))
                    }} title={'Login'}/>
                </div>
                <div className={s.forgotPassword}>
                    <NavLink to={'/resetpassword'}>Forgot Password?</NavLink>
                </div>
                <div className={c.textWrap}>
                    <span>Don't have an account?</span>
                </div>
                <NavLink to={'/registration'}>Sign Up</NavLink>
            </div>

        </div>
    )
}
