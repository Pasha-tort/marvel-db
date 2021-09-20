import React, {Component} from "react";
import { connect } from "react-redux";
import WithMarvelService from '../../hoc';

import {randomCharLoaded, randomCharRequested, randomCharError} from '../../../actions/actionsRandomChar';

import RandomCharacter from './randomCharacter';
import mjolnir from '../../../img/mjolnir.svg';
import shield from '../../../img/shield.svg';


class RandomBox extends Component {

    render() {
        return(
            <div className="random-box">
                <RandomCharacter {...this.props}/>
                <div className="random-box__static">
                    <div className="random-box__static__text random-box__static__text_first">
                        Random character for today! <br/>
                        Do you want to get to know him better?
                    </div>
                    <div className="random-box__static__text random-box__static__text_second">
                        Or choose another one
                    </div>
                    <img src={mjolnir} alt='mjolnir' className="random-box__static__img_mjolnir"/>
                    <img src={shield} alt='shield' className="random-box__static__img_shield"/>
                    <button className="btn btn_random-box-static" onClick={() => this.props.requestedData()}>TRY IT</button>
                </div>
            </div>
        )
    }
}

const WithRandomChar = (Component) => {

    return class extends Component {

        randomCharCreate = (minRunge, maxRunge) => {
            const runge = maxRunge - minRunge;
            const id = Math.floor(Math.random() * runge) + minRunge;
            return id;
        }

        requestedData = () => {
            const {MarvelService, randomCharLoaded, randomCharRequested} = this.props;
            randomCharRequested();
            const id = this.randomCharCreate(1010000, 1011400);
            MarvelService.getCharacter(id)
                .then((res) => randomCharLoaded(res))
                .catch(() => this.requestedData());
        }
        
        render() {
            const {MarvelService, randomCharLoaded, randomCharError, randomCharRequested, ...props} = this.props;
            return <Component {...props} requestedData={this.requestedData}/>
        }
    }
}

const mapStateToProps = ({randomChar}) => {
    return {
        dataChar: randomChar.dataChar,
        loading: randomChar.loading,
        error: randomChar.error,
    }
}

const mapDispatchToProps = {
    randomCharLoaded,
    randomCharRequested,
    randomCharError,
}

export default WithMarvelService()(connect(mapStateToProps, mapDispatchToProps)(WithRandomChar(RandomBox)));