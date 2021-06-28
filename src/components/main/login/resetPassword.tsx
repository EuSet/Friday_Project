import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {forgotPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import r from "./resetPassword.module.css"

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [email, setEmail] = useState('')
    const [remember, setRemember] = useState(false)
    const forgotPassword = (text: string) => {
        dispatch(forgotPasswordThunk(text))
    }
    const changeIsSent = useCallback(() => {
        dispatch(setError(''))
    }, [dispatch])

    useEffect(() => {
        return () => changeIsSent()
    }, [changeIsSent])

    if (remember) {
        return <Redirect to={'/login'}/>
    }
    if (isSent) {
        return <Redirect to={'/addnewpassword/:resetPasswordToken'}/>
    }

    return <div className={r.container}>
        <div className={r.main}>
            <h3>Forgot your password?</h3>
            {error && <span className={r.error}>{error}</span>}
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
                dispatch(setError(''))
            }} type="email" placeholder={'email'}/>
            <div className={r.textWrap}>
        <span>Enter your email address and we willsend you
        further instructions</span>
            </div>
            <div className={r.btnWrap}>
                {isLoader ? <div><Preloader/></div> :
                    <button onClick={() => forgotPassword(email)}><span>Send instructions</span></button>
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
        </div>
    </div>
}

