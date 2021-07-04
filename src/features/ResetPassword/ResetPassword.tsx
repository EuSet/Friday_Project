import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {RoutePath} from "../../components/main/main";
import {useCleanUp} from "../../components/common/utills/CustomHook";
import {AppRootState} from "../../app/store";
import {forgotPasswordThunk, isSentInstructions, setError} from "./reset-reducer";
import {useFormik} from "formik";
import {CheckEmail} from "../../components/common/CheckEmailComponent/CheckEmail";
import {errorSpan} from "../../components/common/utills/SpanError";
import r from "./ResetPassword.module.css"
import {Preloader} from "../../components/common/preloader/Preloader";
import {emailValidation} from "../../components/common/utills/Validation";


type FormErrorType = {
    email?:string
}
export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [remember, setRemember] = useState(false)
    const [email, setEmail] = useState('')
    useCleanUp(setError(''))
    useCleanUp(isSentInstructions(false))

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

    if (remember) {
        return <Redirect to={RoutePath.LOGIN} />
    }
    if (isSent) {
        return <CheckEmail email={email}/>
    }

    return <div className={r.container}>
        <div className={r.main}>
            <h3>Forgot your password?</h3>
            <form onSubmit={formik.handleSubmit}>
            {formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
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

