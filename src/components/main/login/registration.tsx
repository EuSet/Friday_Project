import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { singUp } from '../../../redux/auth-reducer/auth-reducer';
import { AppRootState } from '../../../redux/store';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';

export const Registration = () => {
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootState, string | null>(state => state.auth.userRegistrationData.email)
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
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be 7 characters at least';
            }
            if (!values.checkPassword) {
                errors.checkPassword = 'Required';
            } else if (values.checkPassword !== values.password) {
                errors.checkPassword = 'Passwords should be equal';
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            alert(JSON.stringify(values))
            dispatch(singUp(values.email, values.password))
        },
    })



    // убрал чтобы допилить валидацию
    // if (isRegistered) { 
    //     return <Redirect to={'/login'} />
    // }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email &&
                    formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password &&
                    formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('checkPassword')}
                />
                {formik.touched.checkPassword &&
                    formik.errors.checkPassword ? <div style={{ color: 'red' }}>{formik.errors.checkPassword}</div> : null}
                <SuperButton type={'submit'} title={'sign up'} />
            </form>
        </div>
    )
}
