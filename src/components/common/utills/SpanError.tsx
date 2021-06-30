import r from "../../main/login/resetPassword.module.css";
import React from "react";

export const errorSpan = (error:string) => {
    return <span className={r.error}>{error}</span>
}
