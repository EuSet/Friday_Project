import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {createNewPasswordThunk, setError} from "./reset-reducer";
import {Preloader} from "../../components/common/preloader/Preloader";
import r from "./ResetPassword.module.css";
import { RoutePath } from "../../components/main/main";

export const AddNewPassword = () => {
    const [password, setPassword] = useState('')
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const dispatch = useDispatch()
    const isCreate = useSelector<AppRootState, boolean>(state => state.reset.isCreate)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    console.log(error)
    if (isCreate) {
        return <Redirect to={RoutePath.LOGIN}/>
    }
    return <div className={r.container}>
        <div className={r.main}>
        <h3>Create new password</h3>
            {error && <span className={r.error}>{error}</span>}
        <input value={password} onChange={(e) => {
            setPassword(e.target.value)
            dispatch(setError(''))
        }} type="password" placeholder={'password'}/>
            <div className={r.textWrap}>
        <span>Create new Password and we will send you
        further instructions</span>
            </div>
            <div className={r.btnWrap}>
        {isLoader ? <Preloader/> :
            <button
                    onClick={() => dispatch(createNewPasswordThunk(password, resetPasswordToken))}>Create new password</button>}
            </div>
        </div>
    </div>
}
