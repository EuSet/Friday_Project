import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {getUserDataTC, loginResponseType, logOutTC} from "../Login/login-reducer";
import { RoutePath } from "../../components/main/main";
import { RequestStatusType } from "../../app/app-reducer";
import { Preloader } from "../../components/common/preloader/Preloader";
import c from '../../components/common/commonStyle/commonStyle.module.css'

export const Profile = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const email = useSelector<AppRootState, string>(state => state.login.email)
    const name = useSelector<AppRootState, string>(state => state.login.name)
    const avatar = useSelector<AppRootState, string | undefined>(state => state.login.avatar)
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

    useEffect(() => {

        dispatch(getUserDataTC())

    }, [dispatch])

    if (!isLoggedIn) return <Redirect to={RoutePath.LOGIN}/>

    return (
        <div className={c.wrap}>
            Profile

            <div>
                {avatar ? <img src={avatar} alt={"avatar"}/> : ""}
                <div/>
            <div>name :{name}<div/>
                <div>email :{email}<div/>
                <div>
                    {
                        isLoading === 'loading' ? <Preloader /> :
                        <SuperButton  onClick={() => {
                            dispatch(logOutTC())
                        }} title={"logout"}/>
                    }
                </div>
        </div>
            </div>
        </div>
        </div>
        )
}
