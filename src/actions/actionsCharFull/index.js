const charFullLoaded = (charFull) => {
    return {
        type: 'CHAR_FULL_LOADED',
        payload: charFull, 
    }
}

const charFullComicsLoaded = (comics) => {
    console.log(comics)
    return {
        type: 'CHAR_FULL_COMICS_LOADED',
        payload: comics,
    }
}

const charFullSeriesLoaded = (series) => {
    console.log(series)
    return {
        type: 'CHAR_FULL_SERIES_LOADED',
        payload: series,
    }
}

const charFullRequested = () => {
    return {
        type: 'CHAR_FULL_REQUESTED',
    }
}

const charFullError = () => {
    return {
        type: 'CHAR_FULL_ERROR'
    }
}

const charFullLoadedEnd = () => {
    return {
        type: 'CHAR_FULL_LOADED_END'
    }
}

export {
    charFullLoaded,
    charFullRequested,
    charFullError,
    charFullComicsLoaded,
    charFullSeriesLoaded,
    charFullLoadedEnd,
}