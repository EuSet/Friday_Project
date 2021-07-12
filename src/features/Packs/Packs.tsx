import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {addPackListThunk, deletePackThunk, getPackListThunk, updatePackThunk} from "./packlist-reducer";
import {CardPacksType} from "../../api/PackApi";
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../components/main/main";
import {Find} from "../../components/common/utills/find/Find";
import {Paginator} from "../../components/common/utills/paginator/Paginator";
import {Slider} from "../../components/common/utills/double-slider/Slider-MainComponent";
import {EditableSpan} from "../../components/common/EditableSpan/EditableSpan";


export const Packs = () => {

    const dispatch = useDispatch()
    const filteredPacks = useSelector<AppRootState, CardPacksType[]>(state => state.packs.filteredPacks)
    const [text, setText] = useState('')
    useEffect(() => {
        dispatch(getPackListThunk({}))
    }, [dispatch])
    const onButtonAddClick = () => {
        const obj = {
            name: text,
            path: '/dev',
        }
        dispatch(addPackListThunk(obj))
        setText('')
    }
    const onButtonDeleteClick = (id: string) => {
        dispatch(deletePackThunk(id))
    }
    const changePackTitle = (params:{_id:string, name:string}) => {
        dispatch(updatePackThunk(params))
    }

    const newCardPacks = filteredPacks.map(k =>
        <div className={style.packsDate} key={k._id}>
            <div className={style.blockDis}>
                <EditableSpan  title={k.name} id={k._id} changeTitle={changePackTitle}/>
                {/*<div className={style.namePacks}>{k.name}</div>*/}
                <div>{k.cardsCount}</div>
                <div>{'Time'}</div>
                <div>{'URL'}</div>
            </div>
            <div className={style.buttonBlock}>
                <button onClick={() => {
                    onButtonDeleteClick(k._id)
                }}>Delete</button>
                <button>Edit</button>
                <NavLink to={RoutePath.CARDS}>Cards</NavLink>
            </div>
        </div>)
    return (
        <div>
            <Find/>
            <Slider/>
            <div className={style.headerDate}>
                <span className={style.namePacks}>Name</span>
                <span className={style.namePacks}>cardsCount</span>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
                <button onClick={onButtonAddClick}>Add new pack</button>
            </div>
            <div className={style.packs}>
                {newCardPacks}
            </div>
            <Paginator/>
        </div>
    )
}
