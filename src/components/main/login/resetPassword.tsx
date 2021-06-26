import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {forgotPasswordThunk, isSentInstructions, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [email, setEmail] = useState('')
    const [remember, setRemember] = useState(false)
    const forgotPassword = (text:string) => {
        dispatch(forgotPasswordThunk(text))
    }
    if(remember){
        return <Redirect to={'/login'}/>
    }
    if(isSent){
        return <CheckEmailComponent email={email}/>
    }

    return <div>
        {error && <span style={{color:'red'}}>{error}</span>}<br/>
        <span>Forgot your password?</span> <br/>
        <input value={email} onChange={(e) => {
            setEmail(e.target.value)
            dispatch(setError(''))
        }} type="email" placeholder={'email'}/><br/>
        <span>Enter your email address and we willsend you <br/>
        further instructions</span><br/>
        {isLoader ? <Preloader/> :
        <SuperButton title={'Send'} onClick={() => forgotPassword(email)}/>}<br/>
        <span>Did you remember your password?</span><br/>
        <SuperButton title={'Try logging in'} onClick={() => {setRemember(true)}}/>
     </div>
}
type CheckPropsType = {
    email:string
}
export const CheckEmailComponent = (props:CheckPropsType) => {
    const dispatch = useDispatch()
    const changeIsSent = useCallback(() => {
        dispatch(isSentInstructions(false))
    }, [dispatch])
    useEffect(() => {
       return () =>  changeIsSent()
    }, [changeIsSent])
    return <div>
        <span>Check Email</span><br/>
        <span>We sent an Email with instructions to {props.email}</span>
    </div>
}
