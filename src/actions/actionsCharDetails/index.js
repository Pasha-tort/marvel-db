const charLoaded = (char) => {
    return {
        type: 'CHAR_LOADED',
        payload: char, 
    }
}

const charRequested = () => {
    return {
        type: 'CHAR_REQUESTED',
    }
}

const charError = () => {
    return {
        type: 'CHAR_ERROR'
    }
}

export {
    charLoaded,
    charRequested,
    charError,
}