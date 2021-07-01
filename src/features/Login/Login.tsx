import React, { useState } from "react";
import s from "./Login.module.css"
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { loginTC } from "./login-reducer";
import { AppRootState } from "../../app/store";
import { RoutePath } from "../../components/main/main";
import { RequestStatusType } from "../../app/app-reducer";
import { Preloader } from "../../components/common/preloader/Preloader";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const registeredEmail = useSelector<AppRootState, string>(state => state.auth.userRegistrationData.email)
    const registeredPassword = useSelector<AppRootState, string>(state => state.auth.userRegistrationData.password)
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

    let [email, setEmail] = useState<string>(registeredEmail ? registeredEmail : '')
    let [password, setPassword] = useState<string>(registeredPassword ? registeredPassword : '')
    let [rememberMe, setRememberMe] = useState<boolean>(false)




    if (isLoggedIn) return <Redirect to={RoutePath.PROFILE} />

    return (
        <div className={s.wrap}>
            <div className={s.loginForm}>
                <div>
                    <h2>It-inkubator</h2>
                </div>

                <div>
                    <h3>Sign In</h3>
                </div>


                <div>
                    <span>Email</span>
                    <SuperInputText onChangeText={(value) => {
                        setEmail(value)
                    }}
                        value={email} />
                </div>
                <div>
                    <span>Password</span>
                    <SuperInputText type={"password"}
                        onChangeText={(value) => {
                            setPassword(value)
                        }}
                        value={password} />
                </div>

                <div>
                    <span>Remember me</span>
                    <SuperCheckbox checked={rememberMe}
                        onChangeChecked={(value) => {
                            setRememberMe(value)
                        }} />
                </div>
                <div className={s.forgotPassword}>
                    <NavLink to={'/resetpassword'}>Forgot Password?</NavLink>
                </div>
                <div className={s.submitLogin}>
                    {
                        isLoading === 'loading' ? <Preloader /> :
                            <SuperButton onClick={() => {
                                dispatch(loginTC({ email, password, rememberMe }))
                            }} title={"Login"} />
                    }
                </div>

                <div className={s.signUp}>
                    <div>Don't have an account?</div>
                    <NavLink to={'/registration'}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}
