import React from "react";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import { NavLink } from "react-router-dom";
import h from "./header.module.css"
import { RoutePath } from "../main/main";
export const Header = () => {
    return <div className={h.header}>
        <NavLink to={RoutePath.REGISTRATION}><SuperButton title={'registration'} /></NavLink>
        <NavLink to={RoutePath.LOGIN}><SuperButton title={'login'} /></NavLink>
        <NavLink to={RoutePath.RESET_PASSWORD}><SuperButton title={'resetPass'} /></NavLink>
        <NavLink to={RoutePath.SET_NEW_PASSWORD}><SuperButton title={'newPass'} /></NavLink>
        <NavLink to={RoutePath.PROFILE}><SuperButton title={'profile'} /></NavLink>
        <NavLink to={'/'}><SuperButton title={'test'} /></NavLink>
    </div>
}
