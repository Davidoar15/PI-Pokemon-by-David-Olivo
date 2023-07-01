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
      <div>
        <NavLink to={'/form'}>
          <button>Post a Pokémon</button>
        </NavLink>
      </div>

      <div>
        <select onChange={handleTypeFilter} name='typeFilter'>
          <option value="">All Types</option>
          <option value="normal">Normal</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="poison">Poison</option>
          <option value="electric">Electric</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="dark">Dark</option>
          <option value="flying">Flying</option>
          <option value="ghost">Ghost</option>
          <option value="ice">Ice</option>
          <option value="steel">Steel</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>

        <select onChange={handleOriginFilter} name='originFilter'>
          <option value="">Origin</option>
          <option value="API">pokeAPI</option>
          <option value="DB">DataBase</option>
        </select>

        <SearchBar />

        <select onChange={handleNameOrder} name='nameOrder'>
          <option value="">Alphabetic</option>
          <option value="A">Ascending</option>
          <option value="D">Descending</option>
        </select>

        <select onChange={handleStatOrder} name='statOrder'>
          <option value="">Stats</option>
          <option value="hp">HP</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
          <option value="spcatk">Spc Atk</option>
          <option value="spcdef">Spc Def</option>
          <option value="speed">Speed</option>
        </select>
      </div>

      <NavLink to={'/'}>
        <button>Close</button>
      </NavLink>
    </div>
  );
}

export default connect(null, { filterPokemonsByType, filterPokemonsByOrigin, sortPokemonsByName, sortPokemonsByStat })(Nav);