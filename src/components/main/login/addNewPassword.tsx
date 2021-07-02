import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {createNewPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import r from "./resetPassword.module.css";

export const AddNewPassword = () => {
    const [password, setPassword] = useState('')
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const dispatch = useDispatch()
    const isCreate = useSelector<AppRootState, boolean>(state => state.reset.isCreate)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    console.log(error)
    if (isCreate) {
        return <Redirect to={'/login'}/>
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
