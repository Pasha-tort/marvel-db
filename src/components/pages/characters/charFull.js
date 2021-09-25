import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import WithMarvelService from "../../hoc";
import SpinnerBig from "../../spinner/spinnerBig";
import Spinner from "../../spinner/spinner";
import {charFullLoaded, 
        charFullRequested, 
        charFullError, 
        charFullComicsLoaded, 
        charFullSeriesLoaded, 
        charFullLoadedEnd} from "../../../actions/actionsCharFull";

class CharDetailsFull extends Component {

    async componentDidMount() {
        const {MarvelService, id, charFullLoaded, charFullRequested, charFullSeriesLoaded, charFullComicsLoaded, charFullLoadedEnd} = this.props;
        charFullRequested();
        await MarvelService.getCharacter(id)
            .then((res) => charFullLoaded(res))
            .catch(() => charFullError());
        await MarvelService.getComicsAll(`/characters/${id}/comics?limit=60}&`)
            .then((res) => charFullComicsLoaded(res))
            .catch(() => charFullError());
        await MarvelService.getSeriesAll(`/characters/${id}/series?limit=60}&`)
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
        const {dataCharFull, loading, comicsFull, seriesFull} = this.props;

        if (loading) {
            if (document.documentElement.clientWidth <= 991) {
                return <div className="full__spinner"><Spinner/></div>
            }
            return  <div className="full__spinner"><SpinnerBig/></div>
        }

        if (dataCharFull === null || comicsFull.length === 0 || seriesFull.length === 0) {
            return null
        }
        
        const {name, description, modified, thumbnail:{path}, urls} = dataCharFull;

        let urlWiki = null;
        urls.forEach(item => {
            if (item.type === 'wiki') {
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
                            <div className="full__data__title">All comics featuring a character:</div>
                            <ul className="full__comics full__data">
                                {
                                    comicsFull.list.length === 0 ? 'No comics data' :
                                    comicsFull.list.map((item) => {
                                        const {id, title} = item;
                                        return (
                                            <li onClick={() => this.props.history.push(`/comics/${id}`)} key={id} className="full__data__item">
                                                {title}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <div className="full__data__title">All series featuring a character:</div>
                            <ul className="full__series full__data">
                                {
                                    seriesFull.length === 0 ? 'No series data' :
                                    seriesFull.map((item) => {
                                        const {id, title} = item;
                                        return (
                                            <li key={id} className="full__data__item">
                                                {title}
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