import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../../redux/actions';
import Card from '../Card/Card';
import style from './Cards.module.css';

function Cards({ pokemons, filteredPokemons, isFilterActive, currentPage, changePage }) {

  const pageSize = 12;
  const startIndex = (currentPage-1)*pageSize;
  const endIndex = startIndex + pageSize;

  const renderPokemons = isFilterActive
    ? filteredPokemons
    : pokemons;

  const paginatedPokemons = renderPokemons.slice(startIndex, endIndex);

  return (
    <div>
      <div className={style.paginationBtn}>
        <button className={style.pgnBtn}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          Previous page
        </button>
        <div className={style.nroPage}>
          {currentPage}
        </div>
        <button className={style.pgnBtn}
          disabled={endIndex >= renderPokemons.length}
          onClick={() => changePage(currentPage + 1)}
        >
          Next page
        </button>
      </div>
      
      <div className={style.Cards}>
        {isFilterActive && paginatedPokemons.length === 0
          ? <h2 className={style.h2Cards}>There are No Results</h2>
          : paginatedPokemons.map((pokemon, index) => (
              <Card
                key={index}
                pokemon={pokemon}
              />
            ))
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

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);