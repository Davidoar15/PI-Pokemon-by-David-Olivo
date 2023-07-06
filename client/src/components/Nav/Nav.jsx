import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterPokemonsByType, filterPokemonsByOrigin, sortPokemonsByName, sortPokemonsByStat  } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import style from './Nav.module.css';

function Nav({ filterPokemonsByType, filterPokemonsByOrigin, sortPokemonsByName, sortPokemonsByStat }) {

  const handleTypeFilter = (event) => {
    const selectedType = event.target.value;
    filterPokemonsByType(selectedType);
  };

  const handleOriginFilter = (event) => {
    const selectedOrigin = event.target.value;
    filterPokemonsByOrigin(selectedOrigin);
  };

  const handleNameOrder = (event) => {
    const selectedOrder = event.target.value;
    sortPokemonsByName(selectedOrder);
  };

  const handleStatOrder = (event) => {
    const selectedStat = event.target.value;
    sortPokemonsByStat(selectedStat);
  };

  return (
    <div className="Nav">

      <div className={style.navContainer}>
        <div >
          <NavLink to={'/form'}>
            <button className={style.btnToForm}>A New Pokémon?</button>
          </NavLink>
        </div>

        <div>
          <select className={style.filterOrder} onChange={handleTypeFilter} name='typeFilter'>
            <option  value="">All Types</option>
            <option className={style.oNormal} value="normal">Normal</option>
            <option className={style.oGrass} value="grass">Grass</option>
            <option className={style.oFire} value="fire">Fire</option>
            <option className={style.oWater} value="water">Water</option>
            <option className={style.oBug} value="bug">Bug</option>
            <option className={style.oPoison} value="poison">Poison</option>
            <option className={style.oElectric} value="electric">Electric</option>
            <option className={style.oRock} value="rock">Rock</option>
            <option className={style.oGround} value="ground">Ground</option>
            <option className={style.oPsychic} value="psychic">Psychic</option>
            <option className={style.oFighting} value="fighting">Fighting</option>
            <option className={style.oDark} value="dark">Dark</option>
            <option className={style.oFlying} value="flying">Flying</option>
            <option className={style.oGhost} value="ghost">Ghost</option>
            <option className={style.oIce} value="ice">Ice</option>
            <option className={style.oSteel} value="steel">Steel</option>
            <option className={style.oDragon} value="dragon">Dragon</option>
            <option className={style.oFairy} value="fairy">Fairy</option>
            <option className={style.oUnknown} value="unknown">Unknown</option>
            <option className={style.oShadow} value="shadow">Shadow</option>
          </select>

          <select className={style.filterOrder} onChange={handleOriginFilter} name='originFilter'>
            <option value="">Origin</option>
            <option value="API">pokeAPI</option>
            <option value="DB">DataBase</option>
          </select>
        </div>

        <div>
          <select className={style.filterOrder} onChange={handleNameOrder} name='nameOrder'>
            <option value="">Alphabetic</option>
            <option value="A">A - Z</option>
            <option value="D">Z - A</option>
          </select>

          <select className={style.filterOrder} onChange={handleStatOrder} name='statOrder'>
            <option value="">Stats</option>
            <option className={style.oHP} value="hp">HP</option>
            <option className={style.oAtk} value="attack">Attack</option>
            <option className={style.oDef} value="defense">Defense</option>
            <option className={style.oSpcAtk} value="spcatk">Spc Atk</option>
            <option className={style.oSpcDef} value="spcdef">Spc Def</option>
            <option className={style.oSpeed} value="speed">Speed</option>
          </select>
        </div>

        <div>
          <SearchBar />
        </div>

      
        <div>
          <NavLink to={'/'}>
            <button className={style.btnClose}>Close</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterPokemonsByType: (type) => dispatch(filterPokemonsByType(type)),
    filterPokemonsByOrigin: (origin) => dispatch(filterPokemonsByOrigin(origin)),
    sortPokemonsByName: (order) => dispatch(sortPokemonsByName(order)),
    sortPokemonsByStat: (order, stat) => dispatch(sortPokemonsByStat(order, stat))
  }
}

export default connect(null, mapDispatchToProps)(Nav);