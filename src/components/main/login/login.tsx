import React from "react";
import s from "./login.module.css"
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {loginTC} from "../../../redux/login-reducer/login-reducer";
import {AppRootState} from "../../../redux/store";
import {useFormik} from "formik";
import {setError} from "../../../redux/auth-reducer/reset-reducer";
import {useCleanUp} from "../../common/utills/CustomHook";
import {errorSpan} from "../../common/utills/SpanError";
import {emailValidation, passwordValidation} from "../../common/utills/Validation";

type FormErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)

    useCleanUp(setError(''))

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
                    <SuperButton title={"Login"}/>
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
