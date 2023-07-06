import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Card.module.css';

function Card({ pokemon }) {

    const { id, name, image, types } = pokemon;
    const formattedName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
    const formattedTypes = types?.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' ');
  
    return (
      <div className={style.cardContainer}>
        <div className={style.h1}>
          <h1>{formattedName}</h1>
        </div>
        <NavLink to={`/detail/${id}`}>
          <div className={style.cardImage}>
            <img className={style.img} src={image} alt={name}/>
          </div>
        </NavLink>
        <div className={style.h2}>
          <h2>{formattedTypes}</h2>
        </div>
      </div>
    );
} 

export default Card;