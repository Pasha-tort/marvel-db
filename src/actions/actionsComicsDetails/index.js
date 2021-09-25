const comicsDetailsLoaded = (char) => {
    return {
        type: 'COMICS_DETAILS_LOADED',
        payload: char, 
    }
}

const comicsDetailsRequested = () => {
    return {
        type: 'COMICS_DETAILS_REQUESTED',
    }
}

const comicsDetailsError = () => {
    return {
        type: 'COMICS_DETAILS_ERROR'
    }
}

export {
    comicsDetailsLoaded,
    comicsDetailsRequested,
    comicsDetailsError,
}