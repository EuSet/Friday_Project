import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createNewPasswordThunk, setError} from "./reset-reducer";
import c from "../../components/common/commonStyle/commonStyle.module.css";
import {RoutePath} from "../../components/main/main";
import {AppRootState} from "../../app/store";
import {useCleanUp} from "../../components/common/utills/CustomHook";
import {useFormik} from "formik";
import {errorSpan} from "../../components/common/utills/SpanError";
import {Preloader} from "../../components/common/preloader/Preloader";
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {passwordValidation} from "../../components/common/utills/Validation";

type FormErrorType = {
    password?:string
}
export const AddNewPassword = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const dispatch = useDispatch()
    const isCreate = useSelector<AppRootState, boolean>(state => state.reset.isCreate)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const error = useSelector<AppRootState, string>(state => state.reset.error)

   useCleanUp(setError({error:''}))

    const formik = useFormik({
        initialValues:{
            password:''
        },
        validate:(values) => {
            let errors: FormErrorType = {}
            const errorPass = passwordValidation(values, errors.password)
            errorPass && (errors.password = errorPass)
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(createNewPasswordThunk({password:values.password, resetPasswordToken}))
        }
    })

    if (isCreate) {
        return <Redirect to={RoutePath.LOGIN}/>
    }
    return <div className={c.wrap}>
        <div className={c.formBlock}>
        <h3>Create new password</h3>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.password ? errorSpan(formik.errors.password) : error && errorSpan(error)}
        <SuperInputText {...formik.getFieldProps('password')}
               placeholder={'password'} type={'password'}/>
            <div className={c.textWrap}>
        <span>Create new Password and we will send you
        further instructions</span>
            </div>
            <div>
        {isLoader ? <Preloader/> :
            <SuperButton title={'Create new password'}/>}
            </div>
            </form>
        </div>
    </div>
}
