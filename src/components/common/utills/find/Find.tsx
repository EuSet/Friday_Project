import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getPackListThunk} from "../../../../features/Packs/packlist-reducer";
import style from "./Find.module.css"
import SuperButton from "../../c2-SuperButton/SuperButton";

//1qazxcvBG
export const Find = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    return <div className={style.findBlock}>
            <input size={80} value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder={"Search"} />
            <SuperButton onClick={() => {
                dispatch(getPackListThunk({packName: value}))
                setValue('')
            }} title={"Search"}/>


    </div>
}
