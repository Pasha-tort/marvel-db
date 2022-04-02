import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import WithMarvelService from "../../hoc";

import SpinnerBig from "../../spinner/spinnerBig";
import Spinner from "../../spinner/spinner";

import {comicsFullLoaded, 
        comicsFullRequested, 
        comicsFullError, 
        comicsFullCharactersLoaded, 
        comicsFullCreatorsLoaded, 
        comicsFullLoadedEnd} from "../../../actions/actionsComicsFull";

class ComicsFull extends Component {

    async componentDidMount() {
        const {MarvelService, id, comicsFullLoaded, comicsFullRequested, comicsFullCreatorsLoaded, comicsFullCharactersLoaded, comicsFullLoadedEnd} = this.props;
        comicsFullRequested();
        await MarvelService.getComics(id)
            .then((res) => comicsFullLoaded(res))
            .catch(() => comicsFullError());
        await MarvelService.getCharactersAll(`/comics/${id}/characters?limit=60}&`)
            .then((res) => comicsFullCharactersLoaded(res))
            .catch(() => comicsFullError());
        await MarvelService.getCreatorsAll(`/comics/${id}/creators?limit=60}&`)
            .then((res) => comicsFullCreatorsLoaded(res))
            .catch(() => comicsFullError());
        await comicsFullLoadedEnd();
    }

    transfromDate = (modified) => {
        const res = modified.substr(0, 19);
        const time = Date.parse(res);
        const date = new Date(time);
        return date;
    }

    render() {
        const {dataComics, loading, charactersFull, creatorsFull} = this.props;

        if (loading) {
            if (document.documentElement.clientWidth <= 991) {
                return <div className="full__spinner"><Spinner/></div>
            }
            return  <div className="full__spinner"><SpinnerBig/></div>
        }

        if (dataComics === null || charactersFull.length === 0 || creatorsFull.length === 0) {
            return null
        }
        
        const {name, description, modified, thumbnail:{path}, urls} = dataComics;

        let urlWiki = null;
        urls.forEach(item => {
            if (item.type === 'detail') {
                urlWiki = item.url;
            }
        })
        
        const createUrlImg = () => {
            return `${path}/portrait_uncanny.jpg`;
        }
        const date = this.transfromDate(modified);
        const year = date.getFullYear();
        const mounth = date.getMonth() + 1;
        const day = date.getDate();



        return (
            <div className="full">
                <img src={createUrlImg()} alt={name} className="full__img"/>
                <div className="full__box">
                    <div onClick={() => this.props.history.goBack()} className="full__back">Back to all</div>
                    <div className="full__name">{name}</div>
                    <div className="full__description">{description}</div>
                    <div className="full__modifided">The date the resource was most recently modified: {day+'.'+mounth+'.'+year} year</div>
                    <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey full__btn-grey">WIKI</a>
                    
                </div>
                <div className="full__data-box">
                        <div>
                            <div className="full__data__title">All characters featuring a comics:</div>
                            <ul className="full__comics full__data">
                                {
                                    charactersFull.list.length === 0 ? 'No characters data' :
                                    charactersFull.list.map((item) => {
                                        const {id, name} = item;
                                        return (
                                            <li onClick={() => this.props.history.push(`/characters/${id}`)} key={id} className="full__data__item">
                                                {name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <div className="full__data__title">All creators featuring a comics:</div>
                            <ul className="full__series full__data">
                                {
                                    creatorsFull.list.length === 0 ? 'No creators data' :
                                    creatorsFull.list.map((item) => {
                                        const {id} = item;
                                        return (
                                            <li key={id} className="full__data__item">
                                                {item.firstName + ' ' + item.lastName}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
            </div>
        )
    }
}



const mapStateToProps = ({comicsFull}) => {
    return {
        dataComics : comicsFull.dataComics,
        loading: comicsFull.loading,
        error: comicsFull.error,
        charactersFull: comicsFull.charactersFull,
        creatorsFull: comicsFull.creatorsFull,
    }
}

const mapDispatchToProps = {
    comicsFullLoaded,
    comicsFullRequested,
    comicsFullError,
    comicsFullCharactersLoaded,
    comicsFullCreatorsLoaded, 
    comicsFullLoadedEnd
}

export default WithMarvelService()(connect(mapStateToProps, mapDispatchToProps)(withRouter(ComicsFull)));