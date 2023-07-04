import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPokemon, getPokemonByName } from '../../redux/actions';
import style from './SearchBar.module.css';

function SearchBar({ getPokemonByName, addPokemon, searchedPokemon }) {

  const [searchPkmn, setSearchPkmn] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault()
    const pkmnFound = await getPokemonByName(searchPkmn);
    if (!pkmnFound) {
      window.alert('Not Exist Pokémon with that Name');
    } else {
      if (searchedPokemon.includes(pkmnFound.id)) {
        window.alert("This Pokémon has already been Searched");
      } else {
        addPokemon(pkmnFound);
      }
    }
    setSearchPkmn('');
  }

  const handleInput = (event) => {
    setSearchPkmn(event.target.value)
  }

  return (
    <div className={style.searchBar}>
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
    searchedPokemon: state.pokemons.map(pokemon => pokemon.id)
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getPokemonByName: (name) => dispatch(getPokemonByName(name)),
    addPokemon: (pokemon) => dispatch(addPokemon(pokemon))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar);