import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {addPackListThunk, deletePackListThunk, getPackListThunk} from "../PackList/packlist-reducer";
import {CardPacksType} from "../../api/PackApi";
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../components/main/main";


export const Packs = () => {
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootState, CardPacksType[]>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(getPackListThunk({}))
    }, [])
    const onButtonAddClick = () => {
        const obj = {
            name: 'Packkk',
            path: '/dev',
        }
        dispatch(addPackListThunk(obj))
    }
    const onButtonDeleteClick = (id: string) => {
        dispatch(deletePackListThunk(id))
    }

    const newCardPacks = cardPacks.map(k =>
        <div className={style.packsDate} key={k._id}>
            <div className={style.blockDis}>
                <div className={style.namePacks}>{k.name}</div>
                <div>
                    {k.cardsCount}
                </div>
                <div>
                    {'Time'}
                </div>
                <div>
                    {'URL'}
                </div>
            </div>
            <div className={style.buttonBlock}>
                <button onClick={() => {
                    onButtonDeleteClick(k._id)
                }}>Delete
                </button>
                <button>Update</button>
                <NavLink to={RoutePath.CARDS}>Cards</NavLink>
            </div>
        </div>)

    return (
        <div>
            <div className={style.headerDate}>

                <span className={style.namePacks}>Name</span>
                <span className={style.namePacks}>cardsCount</span>

                <span>updated</span>
                <span>url</span>
                <button onClick={onButtonAddClick}>Add</button>
            </div>
            <div className={style.packs}>
                {newCardPacks}

            </div>
        </div>
    )
}