import { Login } from "../../features/Login/Login";
import React from "react";
import { AddNewPassword } from "../../features/ResetPassword/AddNewPassword";
import { Registration } from "../../features/Registration/Registration";
import { ResetPassword } from "../../features/ResetPassword/ResetPassword";
import { Profile } from "../../features/Profile/Profile";
import { NotFound } from "./notFound";
import { Redirect, Route, Switch } from "react-router-dom";
import { Test } from "../test/test";


export const RoutePath = {
    REGISTRATION: "/registration",
    LOGIN: "/login",
    RESET_PASSWORD: "/resetpassword",
    SET_NEW_PASSWORD: "/set-new-password/:resetPasswordToken",
    PROFILE: "/profile",
}

export const Main = () => {
    return <>
        <Switch>
            <Route path={RoutePath.REGISTRATION} render={() => <Registration />} />
            <Route path={RoutePath.LOGIN} render={() => <Login />} />
            <Route path={RoutePath.RESET_PASSWORD} render={() => <ResetPassword />} />
            <Route path={RoutePath.SET_NEW_PASSWORD} render={() => <AddNewPassword />} />
            <Route path={RoutePath.PROFILE} render={() => <Profile />} />
            <Route exact path={'/'} render={() => <Test />} />
            <Route path={'/404'} render={() => <NotFound />} />
            <Redirect from={'*'} to={'/404'} />
        </Switch>
    </>
}
