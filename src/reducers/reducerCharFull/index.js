const initialStateCharFull = {
    data: null,
    loading: false,
    error: false,
    comicsFull: [],
    seriesFull: [],
}

const reducerCharFull = (state=initialStateCharFull, action) => {
    switch(action.type) {
        case 'CHAR_FULL_LOADED':
            return {
                ...state,
                data: action.payload,
            }
        case 'CHAR_FULL_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'CHAR_FULL_ERROR':
            return {
                ...state,
                error: true
            }
        case 'CHAR_FULL_COMICS_LOADED':
            return {
                ...state,
                comicsFull: action.payload,
            }
        case 'CHAR_FULL_SERIES_LOADED':
            return {
                ...state,
                seriesFull: action.payload,
            }
        case 'CHAR_FULL_LOADED_END':
            return {
                ...state,
                loading: false,
            }
        default:
            return {...state}
    }
}

export default reducerCharFull;