import {Login} from "./login/login";
import React from "react";
import {AddNewPassword} from "./login/addNewPassword";
import {Registration} from "./login/registration";
import {ResetPassword} from "./login/resetPassword";
import {Profile} from "./profile/profile";
import {NotFound} from "./notFound/notFound";
import {Redirect, Route, Switch} from "react-router-dom";
import {Test} from "../test/test";

export const Main = () => {
    return <>
        <Switch>
            <Route path={'/registration'} render={() => <Registration/>}/>
            <Route path={'/login'} render={() => <Login/>}/>
            <Route path={'/resetpassword'} render={() => <ResetPassword/>}/>
            <Route path={'/addnewpassword/:resetPasswordToken'} render={() => <AddNewPassword/>}/>
            <Route path={'/profile'} render={() =>  <Profile/>}/>
            <Route exact path={'/'} render={() => <Test/>}/>
            <Route path={'/404'} render={() => <NotFound/>}/>
            <Redirect from={'*'} to={'/404'}/>
        </Switch>
    </>
}
