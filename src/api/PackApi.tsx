import axios from "axios";

const settings = {
    withCredentials: true,
}

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})
export type CardPacksType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type PackListType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type sortPacksType = {
    packName?:string
    page?:number
    user_id?:string
}
export let defaultSort:sortPacksType = {
    packName:'',
    page:1,
    user_id:''
}
export const packListApi = {
    getPacks(sortData:sortPacksType){
        defaultSort = {...defaultSort, ...sortData}
        console.log(defaultSort)
        return instance.get<PackListType>
        (`cards/pack?packName=${defaultSort.packName}&page=${defaultSort.page}&pageCount=8&user_id=${defaultSort.user_id}`)
    }
}

