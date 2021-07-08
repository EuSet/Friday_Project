import {CardPacksType, PackListType} from "../../api/PackApi";
import {deletePackListThunk, packListReducer} from "./packlist-reducer";

let initialState: PackListType
let pack: CardPacksType
beforeEach(() => {
    pack = {
        cardsCount: 0,
        created: '',
        grade: 0,
        more_id: '',
        name: 'testPack',
        path: '',
        private: false,
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        user_name: '',
        __v: 0,
        _id: '1234'
    }
    initialState = {
        cardPacks: [pack],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
        token: '',
        tokenDeathTime: 0
    }
})
test('pack should be removed', () => {
    const action = deletePackListThunk.fulfilled({id:'1234'}, '', '1234')
    const newState = packListReducer(initialState, action)
    console.log(newState.cardPacks)
    expect(newState.cardPacks.length).toBe(0)
})
