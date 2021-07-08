import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getPackListThunk} from "../../../../features/Packs/packlist-reducer";

//1qazxcvBG
export const Find = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    return <div>
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
            <button onClick={() => {
                dispatch(getPackListThunk({packName: value}))
                setValue('')
            }}>search
            </button>
        </div>
    </div>
}
