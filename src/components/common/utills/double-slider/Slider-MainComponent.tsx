import React, {useCallback} from "react";
import MultiRangeSlider from "./doubleSlider";
import {useDispatch} from "react-redux";
import {sortPacks} from "../../../../features/Packs/packlist-reducer";

export const Slider = () => {
    const dispatch = useDispatch()
    const onChangeWithUseCallBack = useCallback( ({min, max}: { min: number; max: number }) => {
        dispatch(sortPacks({min, max}))
    }, [dispatch])
    return <div>
        <MultiRangeSlider
            min={0}
            max={100}
            onChange={onChangeWithUseCallBack}
        />
    </div>
}
