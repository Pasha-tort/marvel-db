import React, { Component } from "react";
import RandomBox from "./randomBox";
import CharactersList from './charactersList';
import CharDetails from "./charDetails";
import bgFooter from "../../../img/bgFooter.png";


class CharactersPage extends Component {
    render() {
        return (
            <>
                <RandomBox/>
                <div className="list-items-box">
                    <CharactersList/>
                    <CharDetails/>
                    <img className="list-items-box__footer-bg" src={bgFooter} alt="bg"/>
                </div>
                
            </>
        )
    }
}
export default CharactersPage;