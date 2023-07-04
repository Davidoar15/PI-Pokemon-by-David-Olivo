import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Card.module.css';

function Card({ pokemon }) {

  /*function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')     // Reemplaza espacios en blanco con guiones
      .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos excepto guiones
      .replace(/\-\-+/g, '-')   // Reemplaza múltiples guiones seguidos con uno solo
      .replace(/^-+/, '')       // Elimina guiones al inicio
      .replace(/-+$/, '');      // Elimina guiones al final
  }*/

    const { id, name, image, types } = pokemon;
    const formattedName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const formattedTypes = types?.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' ');
    //const formattedName = slugify(name);
  
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