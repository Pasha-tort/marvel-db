const initialStateRandomChar = {
    dataChar: null, 
    loading: false,
    error: false,
}

const randomCharReducer = (state = initialStateRandomChar, action) => {
    switch (action.type) {
        case 'RANDOM_CHAR_LOADED':
            return {
                ...state,
                dataChar: action.payload,
                loading: false,
            }
        case 'RANDOM_CHAR_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'RANDOM_CHAR_ERROR':
            return {
                ...state,
                error: true,
            }
        default:
            return {...state};
    }
}

export default randomCharReducer