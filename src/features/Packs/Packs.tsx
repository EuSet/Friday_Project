import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {addPackListThunk, deletePackThunk, getPackListThunk} from "./packlist-reducer";
import {CardPacksType} from "../../api/PackApi";
import style from './Packs.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {RoutePath} from "../../components/main/main";
import {Find} from "../../components/common/utills/find/Find";
import {Paginator} from "../../components/common/utills/paginator/Paginator";
import {Slider} from "../../components/common/utills/double-slider/Slider-MainComponent";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {RequestStatusType} from "../../app/app-reducer";
import {Preloader} from "../../components/common/preloader/Preloader";
import {getUserDataTC} from "../Login/login-reducer";



export const Packs = () => {
    const dispatch = useDispatch()
    const filteredPacks = useSelector<AppRootState, CardPacksType[]>(state => state.packs.filteredPacks)
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)

    const [text, setText] = useState('')

    useEffect(() => {
        if (isLoggedIn) return
       dispatch(getPackListThunk({}))
    }, [isLoggedIn, dispatch])

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

    const newCardPacks = filteredPacks.map(k =>
        <div className={style.packsDate} key={k._id}>

            <div className={style.blockDis}>
                <span className={style.namePacks}>{k.name}</span>
                <span className={style.namePacks}>{k.cardsCount}</span>
                <span className={style.namePacks}>{k.updated}</span>
                <span className={style.namePacks}>{k.created}</span>
            </div>
            <div className={style.buttonBlock}>
                <button onClick={() => {
                    onButtonDeleteClick(k._id)
                }}>Delete</button>
                <button>Edit</button>
                <NavLink to={RoutePath.CARDS}>Cards</NavLink>
            </div>
        </div>)


  if (!isLoggedIn) {return <Redirect to={RoutePath.LOGIN}/>}


    if (isLoading ==='loading'){
        return <Preloader/>
    }
    return (
        <div className={style.wrap}>
            <div className={style.packsCardBlock}>

                <div className={style.leftBlock}>
                    <span>Show pack cards</span>
                    <div className={style.leftBlockButton}> <button>My</button>
                        <button>All</button></div>
                    <span>Number of cards</span>
                    <Slider/>
                </div>


                <div className={style.rightBlock}>


                    <h2>Packs list</h2>

                    <div className={style.findBlock}>
                    <Find/>
                        <SuperButton onClick={onButtonAddClick} title={"Add new pack"}/>
                    </div>

                   <div className={style.headerDate}>
                        <span className={style.namePacks}>Name</span>
                        <span className={style.namePacks}>Cards</span>
                        <span className={style.namePacks}>Last Update</span>
                        <span className={style.namePacks}>Created By</span>
                        <span className={style.namePacks}>Actions</span>
                       {/* <input value={text} onChange={(e) => setText(e.target.value)}/>*/}

                    </div>
                    <div className={style.packs}>
                        {newCardPacks}
                    </div>
                    <Paginator/>

                </div>



            </div>
        </div>
    )
}
