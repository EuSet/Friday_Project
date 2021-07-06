import {CardPacksType, packListApi, PackListType, sortPacksType} from "../../api/PackApi";
import {setError} from "../ResetPassword/reset-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: PackListType & {filteredPacks:Array<CardPacksType>}  = {
    cardPacks: [],
    filteredPacks:[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}
export const getPackListThunk = createAsyncThunk(
    'pack/getPackListThunk',
    async (sortData: sortPacksType, {dispatch, rejectWithValue}) => {
        try {
            const res = await packListApi.getPacks(sortData)
            return {packs: res.data}
        } catch (e) {
            dispatch(setError({error: 'something wrong'}))
            return rejectWithValue('')
        }
    }
)
const packsSlice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        sortPacks(state, action:PayloadAction<{min:number, max:number}>){
         state.filteredPacks = state.cardPacks.filter(p =>
                p.cardsCount >= action.payload.min && p.cardsCount <= action.payload.max)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPackListThunk.fulfilled, (state, action) => {
            return {...state, ...action.payload.packs, filteredPacks:action.payload.packs.cardPacks}
        })
    }
})
export const packListReducer = packsSlice.reducer
export const {sortPacks} = packsSlice.actions



