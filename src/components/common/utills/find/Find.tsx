import React, {useState} from "react";
import {Paginator} from "../paginator/Paginator";
import {CardPacksType} from "../../../../api/PackApi";
import {useDispatch, useSelector} from "react-redux";
import {getPackListThunk} from "../../../../features/Packs/packlist-reducer";
import {AppRootState} from "../../../../app/store";
import MultiRangeSlider from "../doubleSlider";
//1qazxcvBG

export const Find = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const packs = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.cardPacks)

    return <div>
        <Paginator />
        <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }: { min: number; max: number }) =>
                console.log(`min = ${min}, max = ${max}`)}
        />
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value) } type="text"/>
            <button onClick={() =>{
               dispatch(getPackListThunk({packName:value}))
            }}>search</button>
        </div>
        <div>
            <button onClick={() => dispatch(getPackListThunk({}))}>get</button>
        </div>
        {packs && packs!.map(k => <div key={k._id}>{k.name}<span>   {k.cardsCount}</span></div>)}
    </div>
}
