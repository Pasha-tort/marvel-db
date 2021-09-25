const initialStateComicsFull = {
    dataComics: null,
    loading: false,
    error: false,
    charactersFull: [],
    creatorsFull: [],
}

const reducerComicsFull = (state=initialStateComicsFull, action) => {
    switch(action.type) {
        case 'COMICS_FULL_LOADED':
            return {
                ...state,
                dataComics: action.payload,
            }
        case 'COMICS_FULL_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'COMICS_FULL_ERROR':
            return {
                ...state,
                error: true
            }
        case 'COMICS_FULL_CHARACTERS_LOADED':
            return {
                ...state,
                charactersFull: action.payload,
            }
        case 'COMICS_FULL_CREATORS_LOADED':
            return {
                ...state,
                creatorsFull: action.payload,
            }
        case 'COMICS_FULL_LOADED_END':
            return {
                ...state,
                loading: false,
            }
        default:
            return {...state}
    }
}

export default reducerComicsFull;