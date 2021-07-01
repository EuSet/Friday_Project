import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {createNewPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import r from "./resetPassword.module.css";
import {useFormik} from "formik";
import {useCleanUp} from "../../common/utills/CustomHook";
import {errorSpan} from "../../common/utills/SpanError";
import {passwordValidation} from "../../common/utills/Validation";
import {AppRootState} from "../../app/store";
import {createNewPasswordThunk, setError} from "./reset-reducer";
import {Preloader} from "../../components/common/preloader/Preloader";
import r from "./ResetPassword.module.css";
import { RoutePath } from "../../components/main/main";

type FormErrorType = {
    password?:string
}
export const AddNewPassword = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const dispatch = useDispatch()
    const isCreate = useSelector<AppRootState, boolean>(state => state.reset.isCreate)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const error = useSelector<AppRootState, string>(state => state.reset.error)

   useCleanUp(setError(''))

    const formik = useFormik({
        initialValues:{
            password:''
        },
        validate:(values) => {
            const errors: FormErrorType = {}
            errors.password = passwordValidation(values, errors.password)
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(createNewPasswordThunk(values.password, resetPasswordToken))
        }
    })

    if (isCreate) {
        return <Redirect to={RoutePath.LOGIN}/>
    }
    return <div className={r.container}>
        <div className={r.main}>
        <h3>Create new password</h3>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.password ? errorSpan(formik.errors.password) : error && errorSpan(error)}
        <input {...formik.getFieldProps('password')}
               placeholder={'password'} type={'password'}/>
            <div className={r.textWrap}>
        <span>Create new Password and we will send you
        further instructions</span>
            </div>
            <div className={r.btnWrap}>
        {isLoader ? <Preloader/> :
            <button>Create new password</button>}
            </div>
            </form>
        </div>
    </div>
}
