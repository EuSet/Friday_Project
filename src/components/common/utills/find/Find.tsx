import React, {useState} from "react";
import {Paginator} from "../paginator/Paginator";
import {CardPacksType} from "../../../../api/PackApi";
import {useDispatch, useSelector} from "react-redux";
import {getPackListThunk, sortPacks} from "../../../../features/PackList/packlist-reducer";
import {AppRootState} from "../../../../app/store";
import MultiRangeSlider from "../doubleSlider";


export const Find = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    let filteredPacks = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.filteredPacks)
    let minValue: number = 0;
    let maxValue: number = 1000;
    return <div>
        <Paginator/>
        <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({min, max}: { min: number; max: number }) => {
                minValue = min
                maxValue = max
            }
            }
        />
        <div>
            <button onClick={() => {
                dispatch(sortPacks({min:minValue, max:maxValue}))
            }}>sort
            </button>
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
