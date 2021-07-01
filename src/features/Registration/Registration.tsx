import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { singUp } from './registration-reducer';
import { AppRootState } from '../../app/store';
import SuperInputText from '../../components/common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../components/common/c2-SuperButton/SuperButton';
import { RoutePath } from '../../components/main/main';
import { RequestStatusType } from '../../app/app-reducer';
import { Preloader } from '../../components/common/preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {singUp} from '../../../redux/auth-reducer/auth-reducer';
import {AppRootState} from '../../../redux/store';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {checkPasswordValidation, emailValidation, passwordValidation} from "../../common/utills/Validation";

export const Registration = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    //formik
    type FormErrorType = {
        email?: string
        password?: string
        checkPassword?: string
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkPassword: '',
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            errors.email = emailValidation(values, errors.email)
            errors.password = passwordValidation(values, errors.password)
            errors.checkPassword = checkPasswordValidation(values, errors.checkPassword)
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(singUp(values.email, values.password))
        },
    })



    if (isLoading === 'succeeded') {
        return <Redirect to={RoutePath.LOGIN} />
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email &&
                formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password &&
                formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('checkPassword')}
                />
                {formik.touched.checkPassword &&
                    formik.errors.checkPassword ? <div style={{ color: 'red' }}>{formik.errors.checkPassword}</div> : null}
                <div>
                    {isLoading === 'loading' ? <Preloader /> : <SuperButton type={'submit'} title={'sign up'} />}
                </div>

            </form>
        </div>
    )
}
