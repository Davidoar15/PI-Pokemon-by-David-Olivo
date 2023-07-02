import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav';
import style from './Home.module.css';
import { getPokemons } from '../../redux/actions';

function Home({ pokemons, getPkmns, getPokemons }) {

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  const allPokemons = [...pokemons, ...getPkmns];

  return (
    <div className={style.Home}>
      <Nav />  
      {allPokemons.length > 0 
        ? (<Cards pokemons={allPokemons}/>)
        : (<h2>Waiting for Searchings...</h2>)
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
    getPkmns: state.getPkmns
  };
};

export default connect(mapStateToProps, { getPokemons })(Home);