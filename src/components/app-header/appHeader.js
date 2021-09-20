import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const LinkHeader = styled.a`
    text-decoration: none;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    transition: 0.2s all;
    :hover {
        transition: 0.2s all ;
        font-size: ${props => props.fontSize || '25px'};
        text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
        color: #9F0013;
    }
`

const VerticalLine = styled.div`
    font-size: 24px;
    font-weight: 700;
    padding: 0 8px;
`


const AppHeader = () => {
    return(
        <div className="header">
            <div className="header__home">
                <LinkHeader as={Link} to="/" className="header__home">
                    <span className="header__home_red-text">Marvel&nbsp;</span>information portal
                </LinkHeader>
            </div>
            <div className="header__nav">
                <LinkHeader as={Link} to='/characters/' fontSize='24px'>
                    Characters 
                </LinkHeader>
                <VerticalLine>/</VerticalLine>
                <LinkHeader as={Link} to="/comics/" fontSize='24px'>
                    Comics
                </LinkHeader>
            </div>
            
        </div>
    )
}

export default AppHeader;