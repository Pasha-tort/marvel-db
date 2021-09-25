const initialStateComicsList = {
    itemsList: [],
    total: null,
    // filterPositionAll: {
    //     'two columns': 'two columns',
    //     'three columns': 'three columns',
    //     'strings': 'strings',
    // },
    filterPosition: 'three-columns',
    filterPages: 20,
    // the actual value of the variable 'page' is 'page' + 1
    page: 1,
    loading: false,
    error: false,
}

const reducerComicsList = (state = initialStateComicsList, action) => {
    switch (action.type) {
        case 'COMICS_LIST_LOADED':
            return {
                ...state,
                itemsList: action.payload.list,
                total: action.payload.total,
                loading: false,
            }
        case 'COMICS_LIST_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'COMICS_LIST_ERROR':
            return {
                ...state,
                error: true,
            }
        case 'COMICS_CLICK_ITEM_PAGE':
            return {
                ...state,
                page: action.payload,
            }
        case 'COMICS_CLIKC_FILTER_ITEM':
            return {
                ...state,
                filterPages: action.payload,
                page: 1,
            }
        case 'COMICS_CLICK_FILTER_POSITION':
            return {
                ...state,
                filterPosition: action.payload,
            }
        default:
            return {...state};
    }
            
}

export default reducerComicsList;