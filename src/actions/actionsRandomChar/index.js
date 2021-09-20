const randomCharLoaded = (charId) => {
    return {
        type: 'RANDOM_CHAR_LOADED',
        payload: charId,
    }
    
}

const randomCharRequested = () => {
    return {
        type: 'RANDOM_CHAR_REQUESTED'
    }
}

const randomCharError = () => {
    return {
        type: 'RANDOM_CHAR_ERROR'
    }
}

export {
    randomCharLoaded,
    randomCharRequested,
    randomCharError,
}