import React, {Component} from "react";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/spinner";

class RandomCharacter extends Component {

    render() {
        const {loading, dataChar} = this.props;

        if (loading) {
            return (
                <div className="random-box__dinamic_null">
                   <Spinner/> 
                </div>
            )
        }

        if (dataChar === null || dataChar === undefined ) {
            return  (
                        <div className="random-box__dinamic_null"> 
                            A random character will be displayed here.
                        </div>
                    )
        }

        const {name, description, thumbnail, urls, id} = dataChar;
        let urlWiki = null;
        urls.forEach(item => {
            if (item.type === 'wiki') {
                urlWiki = item.url
            }
        })
        const {path} = thumbnail;
        const urlImg = `${path}/standard_amazing.jpg`;

        return (
            <div className="random-box__dinamic">
                <img src={urlImg} alt={name} className="random-box__thumbnail"/>
                <div className='random-box__dinamic__wrapper'>
                    <div className="random-box__dinamic__title">
                        {name}
                    </div>
                    <div className="random-box__dinamic__text ">
                        {description}
                    </div>
                    <div className="random-box__dinamic__box-btn">
                        <Link to={`/characters/${id}`} className="btn btn_random-box-dinamic">HOMEPAGE</Link>
                        <a href={urlWiki} target="_blank" rel = "noreferrer" className="btn btn_grey btn_random-box-dinamic">WIKI</a>
                    </div>
                    
                </div>
            </div>
        )
    }
}


export default RandomCharacter;