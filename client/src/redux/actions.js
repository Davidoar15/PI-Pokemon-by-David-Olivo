import axios from "axios";
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
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

// Acción para obtener la lista de pokémon
export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${endpoint.pkmn}`);
      if (response.ok) {
        const pokemonsData = await response.json();
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

// Acción para obtener un pokémon por su nombre
export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${endpoint.pkmn}/name?name=${name}`);
      if (response.ok) {
        const pokemonData = await response.json();
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

// Acción para obtener un pokémon por su ID
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

// Acción para filtrar los Pokémon por tipo
export const filterPokemonsByType = (type) => {
  return {
    type: 'FILTER_POKEMONS_BY_TYPE',
    payload: type,
  };
};

// Acción para filtrar los Pokémon por origen (API o DB)
export const filterPokemonsByOrigin = (origin) => {
  return {
    type: 'FILTER_POKEMONS_BY_ORIGIN',
    payload: origin,
  };
};

// Acción para ordenar los Pokémon por nombre
export const sortPokemonsByName = (order) => {
  return {
    type: SORT_POKEMONS_BY_NAME,
    payload: order,
  };
};

// Acción para ordenar los Pokémon por stat
export const sortPokemonsByStat = (stat, order) => {
  return {
    type: SORT_POKEMONS_BY_STAT,
    payload: {
      stat,
      order,
    },
  };
};

// Acción para cambiar de página en el Paginado de la lista principal
export const changePage = (page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: page
  };
};

// Acción para agregar un Pokémon a la lista principal
export const addPokemon = (pokemon) => {
  return {
    type: 'ADD_POKEMON',
    payload: pokemon,
  };
};

// Acción para crear un nuevo pokémon
export const createPokemon = (pkmnFormData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(endpoint.pkmn, pkmnFormData);
      } catch (error) {
        console.error(error);
      }
    };
};