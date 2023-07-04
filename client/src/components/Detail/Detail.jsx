import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPokemonByID } from '../../redux/actions';
import style from './Detail.module.css';

function Detail({ pokemon, getPokemonByID }) {
  
  const { id } = useParams();

  useEffect(() => {
    getPokemonByID(id);
  }, [id]);

  if (!pokemon) {
    return (
      <div className={style.Detail}>
        <NavLink to={'/home'}>
          <button>Back</button>
        </NavLink>
        <h1>Loading...</h1>
      </div>
    )
  }

  const {
    name,
    image,
    types,
    hp,
    attack,
    defense,
    spcatk,
    spcdef,
    speed,
    height,
    weight
  } = pokemon;

  const formattedName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const formattedTypes = types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' ');

  return (
    <div className={style.Detail}>
      <div className={style.btnContainerDetail}>
        <NavLink to={'/home'}>
          <button className={style.btnDetail}>Back</button>
        </NavLink>
      </div>
      <div className={style.detailContainer}>
        <div className={style.imgPkmn}>
          <img className={style.imgDetail} src={image} alt={name}/>
        </div>
        <div className={style.details}>
          <h1 className={style.h1Detail}>{formattedName}</h1>
          <h2 className={style.h2DetailID}>ID: {id}</h2>
          <h2 className={style.h2DetailTypes}>Typing: {formattedTypes}</h2>
          <h2 className={style.h2DetailHP}>HP: {hp}</h2>
          <h2 className={style.h2DetailAttack}>Attack: {attack}</h2>
          <h2 className={style.h2DetailDefense}>Defense: {defense}</h2>
          <h2 className={style.h2DetailSpcAtk}>Special Attack: {spcatk}</h2>
          <h2 className={style.h2DetailSpcDef}>Special Defense: {spcdef}</h2>
          <h2 className={style.h2DetailSpeed}>Speed: {speed}</h2>
          <h2 className={style.h2DetailHeight}>Height: {height} dm</h2>
          <h2 className={style.h2DetailWeight}>Weight: {weight} Hg</h2>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pokemon: state.pokemon
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonByID: (id) => dispatch(getPokemonByID(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);