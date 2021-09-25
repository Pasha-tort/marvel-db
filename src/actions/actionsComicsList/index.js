const listComicsLoaded = (res) => {
    return {
        type: 'COMICS_LIST_LOADED',
        payload: res,
    }
}

const listComicsRequested = () => {
    return {
        type: 'COMICS_LIST_REQUESTED',
    }
}

const listComicsError = () => {
    return {
        type: 'COMICS_LIST_ERROR'
    }
}

const onClickItemPage = (page) => {
    return {
        type: 'COMICS_CLICK_ITEM_PAGE',
        payload: page,
    }
}

const onClickFilterPages = (filter) => {
    return {
        type: 'COMICS_CLIKC_FILTER_ITEM',
        payload: filter,
    }
}

const onClickFilterPosition = (filterPosition) => {
    return {
        type: 'COMICS_CLICK_FILTER_POSITION',
        payload: filterPosition,
    }
}

export {
    listComicsLoaded,
    listComicsRequested,
    listComicsError,
    onClickItemPage,
    onClickFilterPages,
    onClickFilterPosition,
}