const listLoaded = (res) => {
    return {
        type: 'LIST_LOADED',
        payload: res,
    }
}

const listRequested = () => {
    return {
        type: 'LIST_REQUESTED',
    }
}

const listError = () => {
    return {
        type: 'LIST_ERROR'
    }
}

const onClickItemPage = (page) => {
    return {
        type: 'CLICK_ITEM_PAGE',
        payload: page,
    }
}

const onClickFilterPages = (filter) => {
    return {
        type: 'CLIKC_FILTER_ITEM',
        payload: filter,
    }
}

const onClickFilterPosition = (filterPosition) => {
    return {
        type: 'CLICK_FILTER_POSITION',
        payload: filterPosition,
    }
}

export {
    listLoaded,
    listRequested,
    listError,
    onClickItemPage,
    onClickFilterPages,
    onClickFilterPosition,
}