import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {listLoaded, listRequested, listError, onClickItemPage, onClickFilterPages, onClickFilterPosition} from '../../../actions/actionsCharactersList';
import {charLoaded, charError, charRequested} from '../../../actions/actionsCharDetails';
import WithMarvelService from '../../hoc';

import Filters from '../../filters/filters';
import ItemCharactersList from './itemCharactersList';
import Spinner from '../../spinner/spinner';

class CharactersList extends Component {

    render() {
        const {itemsList,
            loading,
            onClickChar,
            total, 
            page, 
            filterPages, 
            filterPosition, 
            onClickItemPage, 
            onClickFilterPages,
            onClickFilterPosition,
        } = this.props;

        const filtersProps = {
            total, page, filterPages, onClickFilterPosition, onClickItemPage, onClickFilterPages,
        }

        return(
            <div className="list-items-box__wrapper">
                <Filters filtersProps={filtersProps}/>
               <ItemsList itemsList={itemsList} filterPosition={filterPosition} loading={loading} onClickChar={onClickChar}/>
            </div>
        )
    }
    
}

const ItemsList = ({itemsList, onClickChar, loading, filterPosition}) => {

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

    let styledClass = "list-items-box__items"

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
                    const {name, thumbnail, id} = item;
                    const {path} = thumbnail;
                    const urlImg = `${path}/standard_xlarge.jpg`;
                    return (
                        <ItemCharactersList onClickChar={onClickChar} id={id} key={id} name={name} urlImg={urlImg}/>
                    )
                })
            }
        </ul>
    )
}

ItemsList.propTypes = {
    loading : PropTypes.bool,
    filterPosition : PropTypes.string,
    onClickChar : PropTypes.func,
    itemsList : PropTypes.array,
}

const WithCharactersList = (Component) => {
    return class extends Component {

        urlCreate = (page, filterPages) => {
            const offfset = (page - 1) * filterPages;
            const limit = filterPages;
            return `limit=${limit}&offset=${offfset}`
        }

        onClickChar = (id) => {
            const {MarvelService, charLoaded, charRequested, charError} = this.props;
            charRequested();
            MarvelService.getCharacter(id)
                .then((res) => charLoaded(res))
                .catch(() => charError());
        }

        componentDidMount() {
            const {MarvelService, listRequested, listLoaded, listError, page, filterPages, itemsList} = this.props;
            if (itemsList.length !== 0) {
                return null;
            }
            listRequested();
            MarvelService.getCharactersAll(`/characters?${this.urlCreate(page, filterPages)}&`)
                .then((res) => listLoaded(res))
                .catch(() => listError());
        }

        componentDidUpdate(prevProps) {
            if (prevProps.page !== this.props.page || prevProps.filterPages !== this.props.filterPages) {
                const {MarvelService, listRequested, listLoaded, listError, page, filterPages} = this.props;
                listRequested();
                MarvelService.getCharactersAll(`/characters?${this.urlCreate(page, filterPages)}&`)
                    .then((res) => listLoaded(res))
                    .catch(() => listError());
            }
        }

        render() {
            const {MarvelService, listRequested, listLoaded, listError, ...props} = this.props;
            return (
                <Component {...props} onClickChar={this.onClickChar}/>
            )
        }
    }
}

const mapStateToProps = ({charactersList}) => {
    return {
        itemsList: charactersList.itemsList,
        total: charactersList.total,
        filterPosition: charactersList.filterPosition,
        filterPages: charactersList.filterPages,
        page: charactersList.page,
        loading: charactersList.loading,
        error: charactersList.error,
    }
}

const mapDispatchToProps = {
    listLoaded,
    listRequested,
    listError,
    onClickItemPage,
    onClickFilterPages,
    onClickFilterPosition,
    charLoaded,
    charRequested,
    charError,
}

export default WithMarvelService()(connect(mapStateToProps, mapDispatchToProps)(WithCharactersList(CharactersList)));