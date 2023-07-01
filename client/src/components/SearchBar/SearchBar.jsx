import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPokemon, getPokemonByName } from '../../redux/actions';
import style from './SearchBar.module.css';

function SearchBar({ pokemon, getPokemonByName, addPokemon }) {

  const [searchPkmn, setSearchPkmn] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault()
    await getPokemonByName(searchPkmn);
    console.log(pokemon)
    // const pkmnFound = pokemon[0];
    addPokemon(pokemon);
    setSearchPkmn('');
  }

  const handleInput = (event) => {
    setSearchPkmn(event.target.value)
  }

  return (
    <div className="SearchBar">
      <input
        className={style.searchInput}
        type="text"
        value={searchPkmn}
        onChange={handleInput}
        placeholder="Search a Pokémon"
      ></input>

      <button onClick={handleSearch} className={style.btnSearch}>
        Search
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pokemon: state.pokemon
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getPokemonByName: (name) => dispatch(getPokemonByName(name)),
    addPokemon: (pokemon) => dispatch(addPokemon(pokemon))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar);