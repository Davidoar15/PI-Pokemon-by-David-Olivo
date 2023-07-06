import axios from "axios";
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const FILTER_POKEMONS_BY_TYPE = 'FILTER_POKEMONS_BY_TYPE';
export const FILTER_POKEMONS_BY_ORIGIN = 'FILTER_POKEMONS_BY_ORIGIN';
export const SORT_POKEMONS_BY_NAME = 'SORT_POKEMONS_BY_NAME';
export const SORT_POKEMONS_BY_STAT = 'SORT_POKEMONS_BY_STAT';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ADD_POKEMON = 'ADD_POKEMON';
const endpoint = {
    pkmn: "http://localhost:3001/pokemons",
    types: "http://localhost:3001/types"
}

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint.pkmn}`);
      if (response.status === 200) {
        const pokemonsData = response.data;
        dispatch({ 
          type: 'GET_POKEMONS', 
          payload: pokemonsData 
        });
      } else {
        throw new Error('Failed to fetch Pokémon list');
      }
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint.pkmn}/name?name=${name}`);
      if (response.status === 200) {
        const pokemonData = response.data;
        const pokemon = pokemonData[0];
        dispatch({ 
          type: 'GET_POKEMON_BY_NAME', 
          payload: pokemon
        });
        return pokemon;
      }
    } catch (error) {
      console.error('Error searching Pokemon:', error);
    }
  };
};

export const getPokemonByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint.pkmn}/${id}`);
      if (response.status === 200) {
        const pokemonData = response.data;
        dispatch({ 
          type: 'GET_POKEMON_BY_ID', 
          payload: pokemonData
        });
      } else {
        throw new Error('Failed to fetch Pokémon');
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };
};

export const filterPokemonsByType = (type) => {
  return {
    type: 'FILTER_POKEMONS_BY_TYPE',
    payload: type,
  };
};

export const filterPokemonsByOrigin = (origin) => {
  return {
    type: 'FILTER_POKEMONS_BY_ORIGIN',
    payload: origin,
  };
};

export const sortPokemonsByName = (order) => {
  return {
    type: SORT_POKEMONS_BY_NAME,
    payload: order,
  };
};

export const sortPokemonsByStat = (stat, order) => {
  return {
    type: SORT_POKEMONS_BY_STAT,
    payload: {
      stat,
      order,
    },
  };
};

export const changePage = (page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: page
  };
};

export const addPokemon = (pokemon) => {
  return {
    type: 'ADD_POKEMON',
    payload: pokemon,
  };
};

export const createPokemon = (pkmnFormData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(endpoint.pkmn, pkmnFormData);
      } catch (error) {
        console.error(error);
      }
    };
};