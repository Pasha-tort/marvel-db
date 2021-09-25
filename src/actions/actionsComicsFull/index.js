const comicsFullLoaded = (charFull) => {
    return {
        type: 'COMICS_FULL_LOADED',
        payload: charFull, 
    }
}

const comicsFullCharactersLoaded = (characters) => {
    return {
        type: 'COMICS_FULL_CHARACTERS_LOADED',
        payload: characters,
    }
}

const comicsFullCreatorsLoaded = (creators) => {
    return {
        type: 'COMICS_FULL_CREATORS_LOADED',
        payload: creators,
    }
}

const comicsFullRequested = () => {
    return {
        type: 'COMICS_FULL_REQUESTED',
    }
}

const comicsFullError = () => {
    return {
        type: 'COMICS_FULL_ERROR'
    }
}

const comicsFullLoadedEnd = () => {
    return {
        type: 'COMICS_FULL_LOADED_END'
    }
}

export {
    comicsFullLoaded,
    comicsFullRequested,
    comicsFullError,
    comicsFullCharactersLoaded,
    comicsFullCreatorsLoaded,
    comicsFullLoadedEnd,
}