import {postPack, postPackType, packListApi, PackListType, sortPacksType} from "../../api/PackApi";
import {setError} from "../ResetPassword/reset-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState: PackListType = {
    cardPacks: [],
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
export const addPackListThunk = createAsyncThunk(
    'pack/addPackListThunk',
    async (cardsPack: postPackType, {dispatch, rejectWithValue}) => {
        try {
            const res = await packListApi.postPacks(cardsPack)
            return {packs: res.data.newCardsPack}
        } catch (e) {
            dispatch(setError({error: 'something wrong'}))
            return rejectWithValue('')
        }
    }
)
export const deletePackListThunk = createAsyncThunk(
    'pack/deletePackListThunk',
    async (id: string, {dispatch, rejectWithValue}) => {
        try {
            await packListApi.deletePacks(id)
            return {id}
        } catch (e) {
            dispatch(setError({error: 'something wrong'}))
            return rejectWithValue('')
        }
    }
)
const packsSlice = createSlice({
    name: 'packs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPackListThunk.fulfilled, (state, action) => {
            return {...state, ...action.payload.packs}
        })
        builder.addCase(addPackListThunk.fulfilled, (state, action) => {
            state.cardPacks.unshift(action.payload.packs)
        })
        // builder.addCase(deletePackListThunk.fulfilled, (state, action) => {
        //     state.cardPacks.filter(pack => pack._id !== action.payload.id)
        // })
        builder.addCase(deletePackListThunk.fulfilled, (state, action) => {
            const index = state.cardPacks.findIndex(pack => pack._id === action.payload.id)
            state.cardPacks.slice(index, 1)
        })
    }
})
export const packListReducer = packsSlice.reducer



