import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {createNewPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import c from '../../common/commonStyle/commonStyle.module.css'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";


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
    return <div className={c.wrap}>
        <div className={c.formBlock}>
        <h3>Create new password</h3>
            {error && <span className={c.error}>{error}</span>}
        <SuperInputText value={password} onChange={(e) => {
            setPassword(e.target.value)
            dispatch(setError(''))
        }} type="password" placeholder={'password'}/>
            <div className={c.textWrap}>
        <span>Create new Password and we will send you
        further instructions</span>
            </div>
            <div>
        {isLoader ? <Preloader/> :
            <SuperButton
                    onClick={() => dispatch(createNewPasswordThunk(password, resetPasswordToken))} title={'Create new password'}/>}
            </div>
        </div>
    </div>
}
