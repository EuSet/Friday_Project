import React, {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from "react";
import "./multiRangeSlider.css";

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
                                                         min,
                                                         max,
                                                         onChange
                                                     }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    // @ts-ignore
    return (
        <div className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                //@ts-ignore
                style={{ zIndex: minVal > (max - 100)  && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;

