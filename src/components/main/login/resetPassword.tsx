import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {forgotPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {NavLink, Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import c from '../../common/commonStyle/commonStyle.module.css'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";


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
        return <Redirect to={'/set-new-password/:resetPasswordToken'}/>
    }

    return <div className={c.wrap}>
        <div className={c.formBlock}>
            <h3>Forgot your password?</h3>
            {error && <span className={c.error}>{error}</span>}
            <SuperInputText value={email} onChange={(e) => {
                setEmail(e.target.value)
                dispatch(setError(''))
            }} type="email" placeholder={'email'}/>
            <div className={c.textWrap}>
        <span>Enter your email address and we will send you
        further instructions</span>
            </div>
            <div>
                {isLoader ? <div><Preloader/></div> :
                    <SuperButton onClick={() => forgotPassword(email)} title={'Send instructions'} />/*<span>Send instructions</span></SuperButton>*/
                }
            </div>
            <div>
                <div className={c.textWrap}>
                    <span>Did you remember your password?</span>
                </div>
                <div>
                  {/*  <button onClick={() => {
                        setRemember(true)
                    }}><span>Try logging in</span>
                    </button>*/}
                    <NavLink to={'/login'}>Try logging in</NavLink>
                </div>
            </div>
        </div>
    </div>
}

