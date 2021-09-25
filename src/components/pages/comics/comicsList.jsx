import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { listComicsLoaded, listComicsRequested, listComicsError, onClickItemPage, onClickFilterPages, onClickFilterPosition,} from '../../../actions/actionsComicsList';
import {comicsDetailsError, comicsDetailsLoaded, comicsDetailsRequested} from '../../../actions/actionsComicsDetails';

import WithMarvelService from '../../hoc';

import Filters from '../../filters/filters';
import ItemComicsList from './itemComicsList';
import Spinner from '../../spinner/spinner';

class ComicsList extends Component {

    render() {
        const {itemsList,
            loading,
            total, 
            page, 
            filterPages, 
            filterPosition, 
            onClickItemPage, 
            onClickFilterPages,
            onClickFilterPosition,
            onClickComics,
        } = this.props;

        const filtersProps = {
            total, page, filterPages, onClickFilterPosition, onClickItemPage, onClickFilterPages,
        }

        return(
            <div className="list-items-box__wrapper">
                <Filters filtersProps={filtersProps}/>
                <ItemsComicsList onClickComics={onClickComics} itemsList={itemsList} filterPosition={filterPosition} loading={loading}/>
            </div>
        )
    }
}

const ItemsComicsList = ({itemsList, loading, filterPosition, onClickComics}) => {
    if (loading) {
        return(
            <div className="list-items-box__spinner">
               <Spinner/> 
            </div>
            
        )
    }

    if (itemsList.length === 0) {
        return null
    }

    let styledClass = "list-items-box__items ";

    if (document.documentElement.clientWidth < 768 && filterPosition === 'three-columns') {
        filterPosition = "two-columns";
    }

    if (filterPosition === 'three-columns') {
        styledClass="list-items-box__items list-items-box__items_three-columns"
    } else if (filterPosition === 'two-columns') {
        styledClass="list-items-box__items list-items-box__items_two-columns"
    } else if (filterPosition === 'one-columns') {
        styledClass="list-items-box__items list-items-box__items_one-columns"
    }

    return (
        <ul className={styledClass}>
            {
                itemsList.map((item, i) => {
                    const {title, thumbnail, id} = item;
                    const {path} = thumbnail;
                    const urlImg = `${path}/portrait_uncanny.jpg`;
                    return (
                        <ItemComicsList onClickComics={onClickComics} id={id} key={id} title={title} urlImg={urlImg}/>
                    )
                })
            }
        </ul>
    )
}

const WithComicsList = (Component) => {
    return class extends Component {

        urlCreate = (page, filterPages) => {
            const offfset = (page - 1) * filterPages;
            const limit = filterPages;
            return `limit=${limit}&offset=${offfset}`
        }

        onClickComics = (id) => {
            if (document.documentElement.clientWidth < 576) {
                const detailsBox = document.querySelector('.details-box__absolute');
                detailsBox.classList.add('details-box__absolute_active');
                detailsBox.style.top = `${document.documentElement.scrollTop - 50}px`
                document.querySelector('body').style.overflow = 'hidden';
            }
            const {MarvelService, comicsDetailsLoaded, comicsDetailsRequested, comicsDetailsError} = this.props;
            comicsDetailsRequested();
            MarvelService.getComics(id)
                .then((res) => comicsDetailsLoaded(res))
                .catch(() => comicsDetailsError());
        }

        componentDidMount() {
            const {MarvelService, listComicsRequested, listComicsLoaded, listComicsError, page, filterPages, itemsList} = this.props;
            if (itemsList.length !== 0) {
                return null;
            }
            listComicsRequested();
            MarvelService.getComicsAll(`/comics?${this.urlCreate(page, filterPages)}&`)
                .then((res) => listComicsLoaded(res))
                .catch(() => listComicsError());
        }

        componentDidUpdate(prevProps) {
            if (prevProps.page !== this.props.page || prevProps.filterPages !== this.props.filterPages) {
                const {MarvelService, listComicsRequested, listComicsLoaded, listComicsError, page, filterPages} = this.props;
                listComicsRequested();
                MarvelService.getComicsAll(`/comics?${this.urlCreate(page, filterPages)}&`)
                    .then((res) => listComicsLoaded(res))
                    .catch(() => listComicsError());
            }
        }

        render() {
            const {MarvelService, listRequested, listLoaded, listError, ...props} = this.props;
            return (
                <Component {...props} onClickComics={this.onClickComics}/>
            )
        }
    }
}

const mapStateToProps = ({comicsList}) => {
    return {
        itemsList: comicsList.itemsList,
        total: comicsList.total,
        filterPosition: comicsList.filterPosition,
        filterPages: comicsList.filterPages,
        page: comicsList.page,
        loading: comicsList.loading,
        error: comicsList.error,
    }
}

const mapDispatchToProps = {
    listComicsLoaded,
    listComicsRequested,
    listComicsError,
    onClickItemPage,
    onClickFilterPages,
    onClickFilterPosition,
    comicsDetailsError, 
    comicsDetailsLoaded, 
    comicsDetailsRequested,
}

export default WithMarvelService()(connect(mapStateToProps, mapDispatchToProps)(withRouter(WithComicsList(ComicsList))));