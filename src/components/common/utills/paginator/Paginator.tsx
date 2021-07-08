import React from "react";
import s from "./Paginator.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../../app/store";
import {getPackListThunk} from "../../../../features/Packs/packlist-reducer";


export const Paginator = () => {
    const pageSize = useSelector<AppRootState, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppRootState, number>(state => state.packs.page)
    const totalCount = useSelector<AppRootState, number>(state => state.packs.cardPacksTotalCount)
    const minCardsCount = useSelector<AppRootState, number>(state => state.packs.minCardsCount)
    const maxCardsCount = useSelector<AppRootState, number>(state => state.packs.maxCardsCount)
    const dispatch = useDispatch()
    let pageCount = Math.ceil(totalCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        pages = [...pages, i]
    }
    return  <div>
        {currentPage > 2 && <span onClick={() => dispatch(getPackListThunk({page:1}))}>{pages[0]}...</span>}
        {pages.map(p => {
            return currentPage + 2 > p && currentPage - 2 < p ?
                <span key={p} onClick={() => dispatch(getPackListThunk({page:p, min:minCardsCount, max:maxCardsCount}))}
                      className={currentPage === p ? s.currentPage : ''}>{p} </span> : ''
        })}
        {currentPage < (pages.length - 1) &&
        <span onClick={() => dispatch(getPackListThunk({page:pages.length}))}>
            ...{pages[pages.length - 1]}</span>}
    </div>
}
