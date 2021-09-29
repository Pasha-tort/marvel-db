import React from "react";

import marvelRef from '../../img/marvel-ref.jpg';

const Footer = () => {
    return (
        <footer className="footer">
            <a href="http://marvel.com" target="_blank" rel = "noreferrer" className="footer__ref">
                <img src={marvelRef} alt="marvel-ref" className="footer__img"/>
                <div className="footer__title">&nbsp;- Marvel.com</div>
            </a>
        </footer>
    )
}

export default Footer;