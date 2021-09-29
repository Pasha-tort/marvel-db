import React from "react";
import nextBtn from '../../icons/next2.svg';
import prevBtn from '../../icons/previous2.svg';


const layoutResolutionMobile = (onClickFilterPosition) => {
    return (
        <div className="filters__filter-position">
            <div onClick={() => onClickFilterPosition('two-columns')} className="filters__filter-position__two-columns">
                <div></div>
                <div></div>
            </div>

            <div onClick={() => onClickFilterPosition('one-columns')} className="filters__filter-position__one-columns">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const layoutResolutionDesktop = (onClickFilterPosition) => {
    return (
        <div className="filters__filter-position">
            <div onClick={() => onClickFilterPosition('three-columns')} className="filters__filter-position__three-columns">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div onClick={() => onClickFilterPosition('two-columns')} className="filters__filter-position__two-columns">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}


const Filters = ({filtersProps: {total, 
                                page, 
                                filterPages, 
                                onClickFilterPosition, 
                                onClickItemPage, 
                                onClickFilterPages}}) => {

    const renderItemsPages = (page, filterPages, total) => {
        const numPages = Math.ceil(total/filterPages);
        const arr = [null];

        for (let i = 1; i <= numPages; i++) {
            arr.push(i);
        }
        arr.shift();
        
        return arr.map((item, i) => {
            let styledClass = "filters__item-pages";
            if (i+1 === page) {
                styledClass = "filters__item-pages filters__item-pages_active";
            }
            return (
                <li onClick={() => onClickItemPage(item)} className={styledClass} key={item}>{item}</li>
            )
        });
    }

    const renderFilterItem = (filterPages) => {
        const arr = [20, 50, 100];

        return arr.map(item => {
            let styledClass = "filters__filter-pages__item";
            if (item === filterPages) {
                styledClass = ' filters__filter-pages__item filters__filter-pages__item_active';
            }
            return (
               <li key={item} className={styledClass} onClick={() => {
                    onClickFilterPages(item);
                    document.querySelector('.filters__filter-pages__items').classList.toggle('filters__filter-pages_drop-down-list')
                }}>{item}</li> 
            )
        });
    }

    let left = 0;

    const clickFilterButton = () => {
        const wrapper = document.querySelector('.filters__pages__items');
        const wrapperWidth = wrapper.offsetWidth;
        const wrapperHiddenWidth = document.querySelector('.filters__pages__hidden-box').offsetWidth;
        return {
            wrapper, wrapperWidth, wrapperHiddenWidth
        }
    }

    const onClickFilterButtonNext = () => {
        const {wrapper, wrapperWidth, wrapperHiddenWidth} = clickFilterButton();
        Math.floor(wrapperWidth/wrapperHiddenWidth)
        if (left.toString() === `-${Math.floor(wrapperWidth/wrapperHiddenWidth) * wrapperHiddenWidth}`) {
            return null;
        }
        left = left - wrapperHiddenWidth;
        wrapper.style.left = `${left}px`;
    }
    const onClickFilterButtonPrev = () => {
        const {wrapperHiddenWidth, wrapper} = clickFilterButton();
        if (left.toString() === '0') {
            return null;
        }
        left = left + wrapperHiddenWidth;
        wrapper.style.left = `${left}px`;
    }

    const onClickShowBy = () => {
        const listFilterPages = document.querySelector('.filters__filter-pages__items');
        listFilterPages.classList.toggle('filters__filter-pages_drop-down-list')

    }

    let filterPositionBox = null;

    if (document.documentElement.offsetWidth >= 768) {
        filterPositionBox = layoutResolutionDesktop(onClickFilterPosition);
    } else if (document.documentElement.offsetWidth < 768) {
        filterPositionBox = layoutResolutionMobile(onClickFilterPosition);
    }


    const itemsPages = renderItemsPages(page, filterPages, total);
    const itemsFilterPages = renderFilterItem(filterPages);

    return (
        <div className="filters">
            <div className="filters__pages">
                <button onClick={() => onClickFilterButtonPrev()} className="filters__btn filters__btn_prev">
                    <img src={prevBtn} alt="prev"/>
                </button>
                <div className="filters__pages__hidden-box">
                    <ul className="filters__pages__items">
                        {itemsPages}
                    </ul>
                </div>
                <button onClick={() => onClickFilterButtonNext()} className="filters__btn filters__btn_next">
                    <img src={nextBtn} alt="next"/>
                </button>
            </div>
            <div className="filters__filter-pages">
                <span onClick={() => onClickShowBy()} className="filters__filter-pages__title">Show by</span>
                <ul className="filters__filter-pages__items">
                    {itemsFilterPages}
                </ul>
            </div>
            {filterPositionBox}
        </div>
    )
}

export default Filters;