import React from "react";
import Modal from "../../modal";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/spinner";

const ComicsDetails = ({dataComics, loading, history}) => {

    if (loading) {
        return (
            <div>
                <div className="details-box details-box_null">
                    <Spinner/>
                </div>
            </div>
        )
    }

    if (dataComics.length === 0) {
        return (
            
            <div className="details-box details-box_null">
                The selected comics will be displayed here
            </div>
            
        )
    }

    const {title, description, thumbnail, characters, urls, id} = dataComics;

    let urlWiki = null;
    urls.forEach(item => {
        if (item.type === 'detail') {
            urlWiki = item.url
        }
    })
    const {path} = thumbnail;
    const urlImg = `${path}/portrait_uncanny.jpg`;

    const dataProps = {
        title,
        description,
        characters,
        id,
        urlWiki,
        urlImg,
        history,
    }

    if (document.documentElement.clientWidth < 576) {
        return <Modal data={<DataLayout {...dataProps}/>}/>
    }
    
    return <DataLayout {...dataProps}/>

}

const DataLayout = ({urlImg, urlWiki, title, id, description, characters, history}) => {

    const onClickBtn = () => {
        document.body.style.overflow = 'auto';
        document.body.removeChild(document.querySelector('.details-box__modal_active'));
    }

    return (
        <div className="details-box">
            <div className="details-box__header">
                <img src={urlImg} alt={title} className="details-box__img"/>
                <div className="details-box__title">
                    <span className="details-box__name">{title}</span>
                    <Link to={`/comics/${id}`} onClick={() => onClickBtn()} className="btn details-box__btn">HOMEPAGE</Link>
                    <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey details-box__btn details-box__btn-grey">WIKI</a>
                </div>
            </div>
            <div className="details-box__description">
                {description}
            </div>
            <span className="details-box__comics_title">Characters:</span>
            <ul className="details-box__comics">
                {   
                    characters.items.length === 0 ? 'No characters data' : 
                    characters.items.map((item, i) => {
                        if (i > 9) {
                            return null;
                        }
                        const reqExp = /\d/g;
                        const num = item.resourceURI.match(reqExp);
                        num.splice(0, 1);
                        const id = num.join('');
                        return (
                            <li onClick={() => {
                                history.push(`/characters/${id}`)
                                document.querySelector('body').style.overflow = 'visible';    
                            }} key={id} className="details-box__comics__item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>     

    )
}

const mapStateToProps = ({comicsDetails}) => {
    return {
        dataComics: comicsDetails.dataComics,
        loading: comicsDetails.loading,
        error: comicsDetails.error,
    }
}


export default connect(mapStateToProps)(withRouter(ComicsDetails));