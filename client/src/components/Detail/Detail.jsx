import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPokemonByName } from '../../redux/actions';
import style from './Detail.module.css';

function Detail({ pokemon, getPokemonByName }) {
  
  const { formattedName } = useParams();

  useEffect(() => {
    getPokemonByName(formattedName);
  }, [formattedName]);

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
    id,
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

  const formattedTypes = types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' ');

  return (
    <div className={style.Detail}>
      <div>
        <NavLink to={'/home'}>
          <button>Back</button>
        </NavLink>
      </div>
      <div className={style.detailConteiner}>
        <div>
          <img className={style.img} src={image} alt={formattedName}/>
        </div>
        <div>
          <h1>{formattedName}</h1>
          <h2>{id}</h2>
          <h2>{formattedTypes}</h2>
          <h2>HP: {hp}</h2>
          <h2>Attack: {attack}</h2>
          <h2>Defense: {defense}</h2>
          <h2>Special Attack: {spcatk}</h2>
          <h2>Special Defense: {spcdef}</h2>
          <h2>Speed: {speed}</h2>
          <h2>Height: {height}</h2>
          <h2>Weight: {weight}</h2>
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
    getPokemonByName: (name) => dispatch(getPokemonByName(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);