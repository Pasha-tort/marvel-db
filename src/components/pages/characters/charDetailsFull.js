import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import WithMarvelService from "../../hoc";
import SpinnerBig from "../../spinner/spinnerBig";
import {charFullLoaded, charFullRequested, charFullError, charFullComicsLoaded, charFullSeriesLoaded, charFullLoadedEnd} from "../../../actions/actionsCharFull";

class CharDetailsFull extends Component {


    async componentDidMount() {
        const {MarvelService, id, charFullLoaded, charFullRequested, charFullSeriesLoaded, charFullComicsLoaded, charFullLoadedEnd} = this.props;
        charFullRequested();
        await MarvelService.getCharacter(id)
            .then((res) => charFullLoaded(res))
            .catch(() => charFullError());
        await MarvelService.getComicsAll(`/characters/${id}/comics?limit=50}&`)
            .then((res) => charFullComicsLoaded(res))
            .catch(() => charFullError());
        await MarvelService.getSeriesAll(`/characters/${id}/series?limit=50}&`)
            .then((res) => charFullSeriesLoaded(res))
            .catch(() => charFullError());
        await charFullLoadedEnd();
    }

    transfromDate = (modified) => {
        const res = modified.substr(0, 19);
        const time = Date.parse(res);
        const date = new Date(time);
        return date;
    }

    render() {
        const {dataCharFull, loading, comicsFull, seriesFull, error} = this.props;

        if (loading) {
            return  <div className="char-full__spinner"><SpinnerBig/></div>
        }

        if (dataCharFull === null || comicsFull.length === 0 || seriesFull.length === 0) {
            return null
        }
        console.log(dataCharFull)
        const {name, description, modified, thumbnail, urls} = dataCharFull;
        let urlWiki = null;
        urls.forEach(item => {
            if (item.type === 'wiki') {
                urlWiki = item.url
            }
        })
        const {path} = thumbnail;
        const urlImg = `${path}/portrait_uncanny.jpg`;
        const date = this.transfromDate(modified);
        const year = date.getFullYear();
        const mounth = date.getMonth() + 1;
        const day = date.getDate();
        return (
            <div className="char-full">
                <img src={urlImg} alt={name} className="char-full__img"/>
                <div className="char-full__box">
                    <div onClick={() => this.props.history.push(`/characters/`)} className="char-full__back">Back to all</div>
                    <div className="char-full__name">{name}</div>
                    <div className="char-full__description">{description}</div>
                    <div className="char-full__modifided">The date the resource was most recently modified: {day+'.'+mounth+'.'+year} year</div>
                    <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey char-full__btn-grey">WIKI</a>
                    <div className="char-full__data-box">
                        <div>
                            <div className="char-full__data__title">All comics featuring a character:</div>
                            <ul className="char-full__comics char-full__data">
                                {
                                    comicsFull.map((item) => {
                                        const {id, title} = item;
                                        return (
                                            <li key={id} className="char-full__data__item">
                                                {title}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <div className="char-full__data__title">All series featuring a character:</div>
                            <ul className="char-full__series char-full__data">
                                {
                                    seriesFull.map((item) => {
                                        const {id, title} = item;
                                        return (
                                            <li key={id} className="char-full__data__item">
                                                {title}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({charFull}) => {
    return {
        dataCharFull : charFull.data,
        loading: charFull.loading,
        error: charFull.error,
        comicsFull: charFull.comicsFull,
        seriesFull: charFull.seriesFull,
    }
}

const mapDispatchToProps = {
    charFullLoaded,
    charFullRequested,
    charFullError,
    charFullComicsLoaded,
    charFullSeriesLoaded, 
    charFullLoadedEnd
}

export default WithMarvelService()(connect(mapStateToProps, mapDispatchToProps)(withRouter(CharDetailsFull)));