import React from "react";
import { NavLink } from "react-router-dom";
import h from "./header.module.css"
import { RoutePath } from "../main/main";
export const Header = () => {
    return <div className={h.header}>

        <NavLink to={RoutePath.REGISTRATION} className={h.menu}>Registration</NavLink>
        <NavLink to={RoutePath.LOGIN} className={h.menu}>Login</NavLink>
        <NavLink to={RoutePath.RESET_PASSWORD} className={h.menu}>Reset Password</NavLink>
        <NavLink to={RoutePath.SET_NEW_PASSWORD} className={h.menu}>new Password</NavLink>
        <NavLink to={RoutePath.PROFILE} className={h.menu}>Profile</NavLink>
        <NavLink to={'/'} className={h.menu}>Test</NavLink>
    </div>

}
