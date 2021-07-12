import {packListApi, PackListType, postPackType, sortPacksType} from "../../api/PackApi";
import {setError} from "../ResetPassword/reset-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: PackListType = {
    cardPacks: [],
    filteredPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
}

export const getPackListThunk = createAsyncThunk(
    'pack/getPackListThunk',
    async (sortData: sortPacksType, {dispatch, rejectWithValue}) => {
        try {
            const res = await packListApi.getPacks(sortData)
            return {packs: res.data}
        } catch (e) {
            dispatch(setError({error: ''}))
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
export const deletePackThunk = createAsyncThunk(
    'pack/deletePacThunk',
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
export const updatePackThunk = createAsyncThunk(
    'pack/updatePackThunk',
    async (params:{id: string, name:string}, {dispatch, rejectWithValue}) => {
        try {
            await packListApi.putPacks(params)
            return {params}
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
            state.minCardsCount = action.payload.min
            state.maxCardsCount = action.payload.max
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPackListThunk.fulfilled, (state, action) => {
            const copyAction = {...action.payload.packs, minCardsCount:state.minCardsCount, maxCardsCount: state.maxCardsCount }
            return {...state, ...copyAction,
                filteredPacks:action.payload.packs.cardPacks
                    .filter(p => p.cardsCount >= state.minCardsCount && p.cardsCount <= state.maxCardsCount)}
        })
        builder.addCase(addPackListThunk.fulfilled, (state, action) => {
            state.cardPacks.unshift(action.payload.packs)
            state.filteredPacks = state.cardPacks
        })
        builder.addCase(deletePackThunk.fulfilled, (state, action) => {
           state.cardPacks = state.cardPacks.filter(p => p._id !== action.payload.id)
            state.filteredPacks = state.cardPacks
        })
        builder.addCase(updatePackThunk.fulfilled, (state, action) => {
            state.cardPacks = state.cardPacks.map(p => p._id === action.payload.params.id ? {...p, name:action.payload.params.name} : p)
            state.filteredPacks = state.cardPacks
        })
    }
})
export const packListReducer = packsSlice.reducer
export const {sortPacks} = packsSlice.actions


