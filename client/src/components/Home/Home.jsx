import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav';
import style from './Home.module.css';
import { getPokemons } from '../../redux/actions';

function Home({ pokemons, getPkmns, getPokemons }) {
  const [initialFetch, setInitialFetch] = useState(false);

  useEffect(() => {
    if (!initialFetch && !getPkmns.length) {
      getPokemons();
      setInitialFetch(true);
    }
  }, [getPkmns, getPokemons, initialFetch]);

  const allPokemons = [...new Set([...getPkmns])];

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
    getPkmns: state.getPkmns
  };
};

export default connect(mapStateToProps, { getPokemons })(Home);