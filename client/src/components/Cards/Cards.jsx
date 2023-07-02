import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changePage } from '../../redux/actions';
import Card from '../Card/Card';
import style from './Cards.module.css';

function Cards({ pokemons, filteredPokemons, isFilterActive, currentPage, changePage }) {

  const pageSize = 12;
  const startIndex = (currentPage-1)*pageSize;
  const endIndex = startIndex + pageSize;

  const renderPokemons = isFilterActive
  ? filteredPokemons.slice(startIndex, endIndex)
  : pokemons.slice(startIndex, endIndex);

  /*const existingPokemon = pokemons.find((pokemon) => pokemon.id === searchedPokemon?.id);
  const updatedPokemons = existingPokemon 
    ? [searchedPokemon, ...renderPokemons] 
    : renderPokemons;*/

  return (
    <div>
      <div className={style.paginationButtons}>
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={renderPokemons.length < pageSize}
          onClick={() => changePage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <div className={style.Cards}>
        {isFilterActive && renderPokemons.length === 0 
          ? (<p>There are No Results</p>)
          : (renderPokemons.map((pokemon) => (
              <Card 
                key={pokemon.id}
                pokemon={pokemon}
              />
            )))
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filteredPokemons: state.filteredPokemons,
    isFilterActive: state.isFilterActive,
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = {
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);