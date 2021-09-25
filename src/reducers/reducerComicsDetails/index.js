const initialStateComicsDetails = {
    dataComics: [],
    loading: false,
    error: false,
}

const reducerComicsDetails = (state=initialStateComicsDetails, action) => {
    switch(action.type) {
        case 'COMICS_DETAILS_LOADED':
            return {
                ...state,
                dataComics: action.payload,
                loading: false,
            }
        case 'COMICS_DETAILS_ERROR':
            return {
                ...state,
                error: true,
            }
        case 'COMICS_DETAILS_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        default: return {...state};
    }
}

export default reducerComicsDetails;