import React from "react";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import h from "./header.module.css"
export const Header = () => {
    return <div className={h.header}>
        <NavLink to={'/registration'}><SuperButton title={'registration'}/></NavLink>
        <NavLink to={'/login'}><SuperButton title={'login'}/></NavLink>
        <NavLink to={'/resetpassword'}><SuperButton title={'resetPass'}/></NavLink>
        <NavLink to={'/addnewpassword'}><SuperButton title={'newPass'}/></NavLink>
        <NavLink to={'/profile'}><SuperButton title={'profile'}/></NavLink>
        <NavLink to={'/'}><SuperButton title={'test'}/></NavLink>
    </div>
}
