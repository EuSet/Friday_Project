import React from "react";
import s from "./Login.module.css"
import {AppRootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {RequestStatusType} from "../../app/app-reducer";
import {emailValidation, passwordValidation} from "../../components/common/utills/Validation";
import {NavLink, Redirect} from "react-router-dom";
import {loginTC} from "./login-reducer";
import {errorSpan} from "../../components/common/utills/SpanError";
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";
import {Preloader} from "../../components/common/preloader/Preloader";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";


type FormErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)



    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            errors.email = emailValidation(values, errors.email)
            errors.password = passwordValidation(values, errors.password)
            return errors;
        },
        onSubmit: values => {
            const email = values.email
            const password = values.password
            const rememberMe = values.rememberMe
            formik.resetForm()
            dispatch(loginTC({email, password, rememberMe}))
        },
    })

    if (isLoggedIn) return <Redirect to={'/profile'}/>

    return (
        <div className={s.wrap}>
            <div className={s.loginForm}>
                <div>
                    <h2>It-inkubator</h2>
                </div>

                <div>
                    <h3>Sign In</h3>
                </div>
                <form action="">
                    <div>
                        <span>Email</span>
                        {formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
                        <SuperInputText
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        {formik.errors.password ? errorSpan(formik.errors.password) : error && errorSpan(error)}
                        <SuperInputText type={"password"}
                                        {...formik.getFieldProps('password')}
                        />
                    </div>

                    <div>
                        <span>Remember me</span>
                        <SuperCheckbox
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <div className={s.forgotPassword}>
                        <NavLink to={'/resetpassword'}>Forgot Password?</NavLink>
                    </div>
                    <div className={s.submitLogin}>
                        {
                            isLoading === 'loading' ? <Preloader/> :
                                <SuperButton title={"Login"}/>
                        }
                    </div>
                </form>
                <div className={s.signUp}>
                    <div>Don't have an account?</div>
                    <NavLink to={'/registration'}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}
