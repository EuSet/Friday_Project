import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../components/main/main";
import {useCleanUp} from "../../components/common/utills/CustomHook";
import {AppRootState} from "../../app/store";
import {forgotPasswordThunk, isSentInstructions, setError} from "./reset-reducer";
import {useFormik} from "formik";
import {CheckEmail} from "../../components/common/CheckEmailComponent/CheckEmail";
import {errorSpan} from "../../components/common/utills/SpanError";

import {Preloader} from "../../components/common/preloader/Preloader";
import {emailValidation} from "../../components/common/utills/Validation";
import c from '../../components/common/commonStyle/commonStyle.module.css'
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";


type FormErrorType = {
    email?:string
}
export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [email, setEmail] = useState('')
    useCleanUp(setError({error:''}))
    useCleanUp(isSentInstructions({isSent:false}))

    const formik = useFormik({
        initialValues:{
            email:''
        },
        validate:(values) => {
            const errors: FormErrorType = {}
            let errorEmail = emailValidation(values, errors.email)
            errorEmail && (errors.email = errorEmail)
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            setEmail(formik.values.email)
            dispatch(forgotPasswordThunk(values.email))

        }
    })
    if (isSent) {
        return <CheckEmail email={email}/>
    }

    return <div className={c.wrap}>
        <div className={c.formBlock}>
            <h3>Forgot your password?</h3>
            <form onSubmit={formik.handleSubmit}>
            {formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
            <SuperInputText
                {...formik.getFieldProps('email')}
                placeholder={'email'}/>
            <div className={c.textWrap}>
        <span>Enter your email address and we will send you
        further instructions</span>
            </div>
            <div>
                {isLoader ? <div><Preloader/></div> :
                    <SuperButton title={'Send instructions'}/>
                }
            </div>

                <div className={c.textWrap}>
                    <span>Did you remember your password?</span><br/>
                </div>
                <div>
                    <NavLink to={RoutePath.LOGIN}>Try logging in</NavLink>

            </div>
            </form>
        </div>
    </div>
}

