import r from "../../../features/ResetPassword/ResetPassword.module.css";
import React from "react";

export const errorSpan = (error:string) => {
    return <span className={r.error}>{error}</span>
}
