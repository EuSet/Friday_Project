import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {createNewPasswordThunk, setError} from "../../../redux/auth-reducer/reset-reducer";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {Preloader} from "../../common/preloader/Preloader";

export const AddNewPassword = () => {
    const [password, setPassword] = useState('')
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const dispatch = useDispatch()
    const isCreate = useSelector<AppRootState, boolean>(state => state.reset.isCreate)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    if (isCreate) {
        return <Redirect to={'/login'}/>
    }
    return <div>
        {error && <span style={{color:'red'}}>{error}</span>}<br/>
        <span>Create new password</span> <br/>
        <input value={password} onChange={(e) => {
            setPassword(e.target.value)
            dispatch(setError(''))
        }} type="password" placeholder={'password'}/><br/>
        <span>Create new Password and we will send you <br/>
        further instructions</span><br/>
        {isLoader ? <Preloader/> :
            <SuperButton title={'Create'}
                         onClick={() => dispatch(createNewPasswordThunk(password, resetPasswordToken))}/>}
        <br/>
    </div>
}
