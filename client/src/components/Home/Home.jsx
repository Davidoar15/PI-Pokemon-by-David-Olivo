import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav';
import style from './Home.module.css';

function Home({ getPokemons }) {

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  return (
    <div className={style.Home}>
      <Nav />  
      <Cards />
    </div>
  );
}

export default connect(null, { getPokemons })(Home);