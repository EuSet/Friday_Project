import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import React, {useEffect} from "react";
import {authMeThunk} from "../../../redux/profile-reducer/profile-reducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {getUserDataTC, logOutTC} from "../../../redux/login-reducer/login-reducer";

export const Profile = () => {
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const userId = useSelector<AppRootState, string>(state => state.profile.id)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const name = useSelector<AppRootState, string>(state => state.login.name)
    const avatar = useSelector<AppRootState, string>(state => state.login.avatar)

    useEffect(() => {
        if (isLoggedIn) return
        dispatch(getUserDataTC())
    }, [isLoggedIn, dispatch])
    useEffect(() => {
        if (userId) {
            return;
        } else {
            dispatch(authMeThunk())
        }

    }, [userId, dispatch])
    if(isLoader){
        return <Preloader/>
    }
    if (!userId) {
        return <Redirect to={'/login'}/>
    }

    if (!isLoggedIn) return <Redirect to={'/login'}/>

    return (
        <div>
            Profile
            <div>
                <img src={avatar}
                     alt={"avatar"}
                    />
                <div/>
            <div>{name}<div/>
                <div>
                    <SuperButton  onClick={() => {
                        dispatch(logOutTC())
                    }} title={"logout"}/>

                </div>
        </div>
        </div>
        </div>
        )
}
