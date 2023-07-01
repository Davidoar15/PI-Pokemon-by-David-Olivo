import { 
  GET_POKEMON_BY_NAME, 
  GET_POKEMONS,
  FILTER_POKEMONS_BY_TYPE, 
  FILTER_POKEMONS_BY_ORIGIN,
  SORT_POKEMONS_BY_NAME,
  SORT_POKEMONS_BY_STAT,
  CHANGE_PAGE, 
  ADD_POKEMON
} from "./actions";

const initialState = {
  pokemon: null,
  pokemons: [],
  filteredPokemons: [],
  isFilterActive: false,
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: action.payload
      };

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }

    case FILTER_POKEMONS_BY_TYPE:
      if (action.payload === "") {
        return {
          ...state,
          filteredPokemons: [],
          isFilterActive: false,
        };
      }
      const filteredByType = state.pokemons.filter(pokemon => pokemon.types.includes(action.payload));
      return {
        ...state,
        filteredPokemons: filteredByType,
        isFilterActive: true
      };

    case FILTER_POKEMONS_BY_ORIGIN:
      if (action.payload === "") {
        return {
          ...state,
          filteredPokemons: [],
          isFilterActive: false,
        };
      }
      const filteredByOrigin = state.pokemons.filter((pokemon) => {
        if (typeof pokemon.id === 'string') {
          return action.payload === "DB";
        } else {
          return action.payload === "API";
        }
      });
      return {
        ...state,
        filteredPokemons: filteredByOrigin,
        isFilterActive: true
      };

    case SORT_POKEMONS_BY_NAME:
      const allPokemons = [...state.pokemons]
      const sortedByName = allPokemons.sort((a, b) => {
        if (action.payload === "A") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "D") {
          return b.name.localeCompare(a.name);
        } 
      });
      return {
        ...state,
        pokemons: sortedByName,
      };
    
    case SORT_POKEMONS_BY_STAT:
      const { stat, order } = action.payload;
      const allPkmn = [...state.pokemons];
      const sortedByStat = allPkmn.sort((a, b) => {
        if (order === 'asc') {
          return a[stat] - b[stat];
        } else {
          return b[stat] - a[stat];
        }
      });
      return {
        ...state,
        pokemons: sortedByStat,
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload]
      }

    default:
      return state;
  }
};

export default reducer;