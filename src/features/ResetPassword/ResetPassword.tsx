import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../app/store";
import { forgotPasswordThunk, setError } from "./reset-reducer";
import { Redirect } from "react-router-dom";
import { Preloader } from "../../components/common/preloader/Preloader";
import r from "./ResetPassword.module.css"
import { RoutePath } from "../../components/main/main";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {forgotPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import r from "./resetPassword.module.css"
import {useFormik} from "formik";
import {CheckEmail} from "../../common/CheckEmailComponent/CheckEmail";
import {useCleanUp} from "../../common/utills/CustomHook";
import {errorSpan} from "../../common/utills/SpanError";
import {emailValidation} from "../../common/utills/Validation";

type FormErrorType = {
    email?:string
}
export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [remember, setRemember] = useState(false)

    useCleanUp(setError(''))

    const formik = useFormik({
        initialValues:{
            email:''
        },
        validate:(values) => {
            const errors: FormErrorType = {}
            errors.email = emailValidation(values, errors.email)
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(forgotPasswordThunk(values.email))
        }
    })

    if (remember) {
        return <Redirect to={RoutePath.LOGIN} />
    }
    if (isSent) {
        return <CheckEmail email={formik.values.email}/>
    }

    return <div className={r.container}>
        <div className={r.main}>
            <h3>Forgot your password?</h3>
            {formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
            <form onSubmit={formik.handleSubmit}>
            <input
                {...formik.getFieldProps('email')}
                placeholder={'email'}/>
            <div className={r.textWrap}>
        <span>Enter your email address and we willsend you
        further instructions</span>
            </div>
            <div className={r.btnWrap}>
                {isLoader ? <div><Preloader/></div> :
                    <button><span>Send instructions</span></button>
                }
            </div>
            <div className={r.footer}>
                <div className={r.textWrap}>
                    <span>Did you remember your password?</span><br/>
                </div>
                <div className={r.btnFooterWrap}>
                    <button onClick={() => {
                        setRemember(true)
                    }}><span>Try logging in</span>
                    </button>
                </div>
            </div>
            </form>
        </div>
    </div>
}

