import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const LinkHeader = styled.a`
    text-decoration: none;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    transition: 0.2s all;
    span {
        font-size: 25px;
    }
    :hover {
        transition: 0.2s all ;
        font-size: 24px;
        text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
        color: #9F0013;
    }
    @media (max-width: 991px) {
        :hover {
            transition: none;
            font-size: 24px;
            text-shadow: none;
            color: #000;
        }
        :active {
            transition: 0.2s all;
            font-size: 25px;
            text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
            color: #9F0013;
        }
    }
    @media (max-width: 767px) {
        font-size: 20px;
        span {
            font-size: 20px;
        }
        :hover {
            font-size: 20px;
        }
        :active {
            transition: 0.2s all;
            font-size: 21px;
            text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
            color: #9F0013;
        }
    }
    @media (max-width: 575px) {
        font-size: 14px;
        span {
            font-size: 14px;
        }
        :hover {
            font-size: 14px;
        }
        :active {
            font-size: 15px;
        }
    }
`

const VerticalLine = styled.div`
    font-size: 24px;
    font-weight: 700;
    padding: 0 8px;
    @media(max-width: 767px) {
        font-size: 20px;
    }
    @media(max-width: 575px) {
        font-size: 14px;
    }
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
                <LinkHeader as={Link} to='/characters/'>
                    Characters 
                </LinkHeader>
                <VerticalLine>/</VerticalLine>
                <LinkHeader as={Link} to="/comics/">
                    Comics
                </LinkHeader>
            </div>
            
        </div>
    )
}

export default AppHeader;