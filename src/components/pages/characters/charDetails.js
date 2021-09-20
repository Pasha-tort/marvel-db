import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/spinner";

const CharDetails = ({dataChar, loading, history}) => {

    if (loading) {
        return (
            <div>
                <div className="char-details-box char-details-box_null">
                    <Spinner/>
                </div>
            </div>
        )
    }

    if (dataChar.length === 0) {
        return (
            <div>
                <div className="char-details-box char-details-box_null">
                    The selected character will be displayed here
                </div>
            </div>
        )
    }
    
    const {name, description, thumbnail, comics, urls, id} = dataChar;
    console.log(history)
    let urlWiki = null;
    urls.forEach(item => {
        if (item.type === 'wiki') {
            urlWiki = item.url
        }
    })
    const {path} = thumbnail;
    const urlImg = `${path}/standard_amazing.jpg`;
    
    return (
        <div>
            <div className="char-details-box">
                <div className="char-details-box__header">
                    <img src={urlImg} alt={name} className="char-details-box__img"/>
                    <div className="char-details-box__title">
                        <span className="char-details-box__name">{name}</span>
                        <Link to={`/characters/${id}`} className="btn char-details-box__btn">HOMEPAGE</Link>
                        <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey char-details-box__btn-grey">WIKI</a>
                    </div>
                </div>
                <div className="char-details-box__description">
                    {description}
                </div>
                <span className="char-details-box__comics_title">Comics:</span>
                <ul className="char-details-box__comics">
                    {
                        comics.items.map((item, i) => {
                            if (i > 9) {
                                return null;
                            }
                            const reqExp = /\d/g;
                            const num = item.resourceURI.match(reqExp);
                            num.splice(0, 1);
                            const id = num.join('');
                            return (
                                <li key={id} className="char-details-box__comics__item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>     
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharDetails));