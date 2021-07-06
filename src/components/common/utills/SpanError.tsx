import c from "../../common/commonStyle/commonStyle.module.css";
import React from "react";

export const errorSpan = (error:string) => {
    return <span className={c.error}>{error}</span>
}
