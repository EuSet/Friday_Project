import React, {useEffect} from "react";
import c from '../../components/common/commonStyle/commonStyle.module.css'
import s from "./Login.module.css"
import {AppRootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {RequestStatusType} from "../../app/app-reducer";
import {NavLink, Redirect} from "react-router-dom";
import {getUserDataTC, loginTC} from "./login-reducer";
import {errorSpan} from "../../components/common/utills/SpanError";
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";
import {Preloader} from "../../components/common/preloader/Preloader";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {emailValidation, passwordValidation} from "../../components/common/utills/Validation";
import {RoutePath} from "../../components/main/main";
import { setError } from "../ResetPassword/reset-reducer";


type FormErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setError({error:''}))
    }, [dispatch])

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
            const errorEmail = emailValidation(values, errors.email)
            errorEmail && (errors.email = errorEmail)
            const errorPass = passwordValidation(values, errors.password)
            errorPass && (errors.password = errorPass)
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

    if (isLoggedIn) return <Redirect to={RoutePath.PROFILE}/>

    return (
        <div className={c.wrap}>
            <div className={c.formBlock}>

                <div>
                    <h3>Sign In</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                        {formik.errors.email && formik.touched.email ? errorSpan(formik.errors.email)
                            : error && errorSpan(error)}
                        <SuperInputText placeholder={'email'}
                            {...formik.getFieldProps('email')}
                        />
                    <div>

                        {formik.errors.password && formik.touched.password ? errorSpan(formik.errors.password)
                            : error && errorSpan(error)}
                        <SuperInputText type={"password"} placeholder={'password'}
                                        {...formik.getFieldProps('password')}
                        />
                    </div>

                    <div className={c.textWrap}>
                        <span>Remember me</span>
                        <SuperCheckbox
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <div className={s.forgotPassword}>
                        <NavLink to={RoutePath.RESET_PASSWORD}>Forgot Password?</NavLink>
                    </div>
                    <div>
                        {isLoading === 'loading' ? <Preloader/> :
                                <SuperButton  title={"Login"} type={'submit'}/>
                        }
                    </div>
                </form>

                    <div className={c.textWrap}>
                       <span>Don't have an account?</span>
                    </div>
                    <NavLink to={RoutePath.REGISTRATION}>Sign Up</NavLink>

            </div>
        </div>
    )
}
