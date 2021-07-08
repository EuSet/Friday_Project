import React, {useState} from "react";
import {CardPacksType} from "../../../../api/PackApi";
import {useDispatch, useSelector} from "react-redux";
import {getPackListThunk} from "../../../../features/Packs/packlist-reducer";
import {AppRootState} from "../../../../app/store";

//1qazxcvBG
export const Find = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    let filteredPacks = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.filteredPacks)

    return <div>
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
            <button onClick={() => {
                dispatch(getPackListThunk({packName: value}))
            }}>search
            </button>
        </div>
        <div>
            <button onClick={() => dispatch(getPackListThunk({}))}>get</button>
        </div>
        {filteredPacks && filteredPacks!.map(k => <div key={k._id}>{k.name}<span>   {k.cardsCount}</span></div>)}
    </div>
}
