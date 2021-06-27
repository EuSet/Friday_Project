import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import React, {useEffect} from "react";
import {authMeThunk} from "../../../redux/profile-reducer/profile-reducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";

export const Profile = () => {
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const userId = useSelector<AppRootState, string>(state => state.profile.id)
    const dispatch = useDispatch()
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
    return <>
        Profile
    </>
}
