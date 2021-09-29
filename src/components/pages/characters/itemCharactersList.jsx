import React from "react";


const ItemCharactersList = ({name, urlImg, onClickChar, id}) => {
    return (
        <li className="list-items-box__item" onClick={() => onClickChar(id)}>
            <img src={urlImg} alt={name} className="list-items-box__img"/>
            <div className="list-items-box__field-name">
                <span>{name}</span>
            </div>
        </li>
    )
}

export default ItemCharactersList;