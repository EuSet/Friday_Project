import React from "react";
import {NavLink} from "react-router-dom";
import h from "./header.module.css"
export const Header = () => {
    return <div className={h.header}>
        <NavLink to={'/registration'} className={h.menu}>Registration</NavLink>
        <NavLink to={'/login'} className={h.menu}>Login</NavLink>
        <NavLink to={'/resetpassword'} className={h.menu}>Reset Password</NavLink>
        <NavLink to={'/set-new-password/:resetPasswordToken'} className={h.menu}>New Password</NavLink>
        <NavLink to={'/profile'} className={h.menu}>Profile</NavLink>
        <NavLink to={'/'} className={h.menu}>Test</NavLink>
    </div>
}
