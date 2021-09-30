import React from "react";
import Modal from "../../modal";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/spinner";

const CharDetails = ({dataChar, loading, history}) => {

    if (loading) {
        return (
            <div>
                <div className="details-box details-box_null">
                    <Spinner/>
                </div>
            </div>
        )
    }

    if (dataChar.length === 0) {
        return (
            
            <div className="details-box details-box_null">
                The selected character will be displayed here
            </div>
            
        )
    }
    
    const {name, description, thumbnail, comics, urls, id} = dataChar;
    let urlWiki = null;
    urls.forEach(item => {
        if (item.type === 'wiki') {
            urlWiki = item.url
        }
    })
    const {path} = thumbnail;
    const urlImg = `${path}/standard_amazing.jpg`;

    const dataProps = {
        name,
        description,
        comics,
        id,
        urlWiki,
        urlImg,
        history,
    }

    if (document.documentElement.clientWidth < 576) {
        return <Modal data={<DataLayout {...dataProps}/>}/>
    }
    
    return <DataLayout {...dataProps}/>;
}

const DataLayout = ({urlImg, urlWiki, name, id, description,comics, history}) => {

    const onClickBtn = () => {
        if (document.querySelector('.details-box__modal_active')) {
            document.body.style.overflow = 'auto';
            document.body.removeChild(document.querySelector('.details-box__modal_active'));
        } 
    }

    return (
        <div className="details-box">
        <div className="details-box__header">
            <img src={urlImg} alt={name} className="details-box__img"/>
            <div className="details-box__title">
                <span className="details-box__name">{name}</span>
                <Link to={`/characters/${id}`} onClick={() => onClickBtn()} className="btn details-box__btn">HOMEPAGE</Link>
                <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey details-box__btn details-box__btn-grey">WIKI</a>
            </div>
        </div>
        <div className="details-box__description">
            {description}
        </div>
        <span className="details-box__comics_title">Comics:</span>
        <ul className="details-box__comics">
            {
                comics.items.length === 0 ? 'No comics data' :
                comics.items.map((item, i) => {
                    if (i > 9) {
                        return null;
                    }
                    const reqExp = /\d/g;
                    const num = item.resourceURI.match(reqExp);
                    num.splice(0, 1);
                    const id = num.join('');
                    return (
                        <li onClick={() => {
                            history.push(`/comics/${id}`);
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

const mapStateToProps = ({charDetails}) => {
    return {
        dataChar: charDetails.dataChar,
        loading: charDetails.loading,
        error: charDetails.error,
    }
}


export default connect(mapStateToProps)(withRouter(CharDetails));