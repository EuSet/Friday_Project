import r from "../../../features/ResetPassword/ResetPassword.module.css"
import React from "react";
import EmailIcon from "./../../../images/checkemail.png"

type PropsType = {
    email:string
}
export const CheckEmail = (props:PropsType) => {
    return <div className={r.container}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}} className={r.main}>
                <div style={{}} className={r.textWrap}>
                    <img src={EmailIcon} alt=""/>
                    <h3>Check Email</h3>
        <span>We've sent an Email with instructions to {props.email}</span>
                </div>
        </div>
    </div>
}
