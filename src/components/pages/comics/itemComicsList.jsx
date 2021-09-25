import React from "react";


const ItemComicsList = ({title, urlImg, onClickComics, id}) => {
    return (
        <li className="list-items-box__item" onClick={() => onClickComics(id)}>
            <img src={urlImg} alt={title} className="list-items-box__img"/>
            <div className="list-items-box__field-name">
                <span>{title}</span>
            </div>
        </li>
    )
}

export default ItemComicsList;