import React, { Component } from "react";
import RandomBox from "./randomBox";
import CharactersList from './charactersList';
import CharDetails from "./charDetails";
import bgFooter from "../../../img/bgFooter.png";


class CharactersPage extends Component {
    render() {
        let charDetails = <CharDetails/>;
        if (document.documentElement.clientWidth < 576) {
            charDetails = <div onClick={(e) => {
                                if (e && e.target.matches('.details-box__absolute')) {
                                    document.querySelector('.details-box__absolute').classList.remove('details-box__absolute_active');
                                    document.querySelector('body').style.overflow = 'visible';
                                }
                            }} className="details-box__absolute">
                                <CharDetails/>
                            </div>
        }
        return (
            <>
                <RandomBox/>
                <div className="list-items-box">
                    <CharactersList/>
                    {charDetails}
                    <img className="list-items-box__footer-bg" src={bgFooter} alt="bg"/>
                </div>
                
            </>
        )
    }
}
export default CharactersPage;