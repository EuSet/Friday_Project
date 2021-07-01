import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createNewPasswordThunk, setError} from "./reset-reducer";
import r from "./ResetPassword.module.css";
import {RoutePath} from "../../components/main/main";
import {AppRootState} from "../../app/store";
import {useCleanUp} from "../../components/common/utills/CustomHook";
import {useFormik} from "formik";
import {errorSpan} from "../../components/common/utills/SpanError";
import {Preloader} from "../../components/common/preloader/Preloader";

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
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be 7 characters at least';
            }
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
