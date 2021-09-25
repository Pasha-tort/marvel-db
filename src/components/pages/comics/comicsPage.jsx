import React, { Component } from "react";
import ComicsList from "./comicsList";
import ComicsDetails from "./comicsDetails";
import bgFooter from '../../../img/bgFooter.png';

class ComiscsPage extends Component {
    render() {
        let comicsDetails = <ComicsDetails/>;
        if (document.documentElement.clientWidth < 576) {
            comicsDetails = <div onClick={(e) => {
                                if (e && e.target.matches('.details-box__absolute')) {
                                    document.querySelector('.details-box__absolute').classList.remove('details-box__absolute_active');
                                    document.querySelector('body').style.overflow = 'visible';
                                }
                            }} className="details-box__absolute">
                                <ComicsDetails/>
                            </div>
        }
        return (
            <div className="list-items-box">
                <ComicsList/>
                {comicsDetails}
                <img className="list-items-box__footer-bg" src={bgFooter} alt="bg"/>
            </div>
        )
    }
}
export default ComiscsPage;