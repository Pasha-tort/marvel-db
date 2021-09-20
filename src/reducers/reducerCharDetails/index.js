const initialStateCharDetails = {
    dataChar: [],
    loading: false,
    error: false,
}

const charDetailsReducer = (state = initialStateCharDetails, action) => {
    switch(action.type) {
        case 'CHAR_LOADED':
            return {
                ...state,
                dataChar: action.payload,
                loading: false,
            }
        case 'CHAR_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'CHAR_ERROR':
            return {
                ...state,
                error: true,
            }
        default:
            return {...state};
    }
}

export default charDetailsReducer;