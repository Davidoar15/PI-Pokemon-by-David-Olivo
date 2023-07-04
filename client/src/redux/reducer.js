import { 
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
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
  getPkmns: [],
  filteredPokemons: [],
  isFilterActive: false,
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        getPkmns: action.payload
      }
      
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: action.payload
      };

    case FILTER_POKEMONS_BY_TYPE:
      if (action.payload === "") {
        return {
          ...state,
          filteredPokemons: [],
          isFilterActive: false,
          currentPage: 1
        };
      }
      const allPkmnType = [...state.pokemons, ...state.getPkmns];
      const filteredByType = allPkmnType.filter(pokemon => pokemon.types.includes(action.payload));
      const uniqueFilteredByType = filteredByType.filter(
        (pokemon, index, self) =>
          index === self.findIndex(p => p.id === pokemon.id)
      );
      return {
        ...state,
        filteredPokemons: uniqueFilteredByType,
        isFilterActive: true,
        currentPage: 1
      };

    case FILTER_POKEMONS_BY_ORIGIN:
      if (action.payload === "") {
        return {
          ...state,
          filteredPokemons: [],
          isFilterActive: false,
          currentPage: 1
        };
      }
      const allPkmnOrigin = [...state.pokemons, ...state.getPkmns];
      const filteredByOrigin = allPkmnOrigin.filter((pokemon) => {
        if (typeof pokemon.id === 'string') {
          return action.payload === "DB";
        } else {
          return action.payload === "API";
        }
      });
      const uniqueFilteredByOrigin = filteredByOrigin.filter(
        (pokemon, index, self) =>
          index === self.findIndex(p => p.id === pokemon.id)
      );
      return {
        ...state,
        filteredPokemons: uniqueFilteredByOrigin,
        isFilterActive: true,
        currentPage: 1
      };

    case SORT_POKEMONS_BY_NAME:
      if (action.payload === "") {
        return {
          ...state,
          pokemons: [...state.pokemons],
          filteredPokemons: [...state.filteredPokemons]
        }
      }
      const sortedByName = [...state.pokemons, ...state.getPkmns].sort((a, b) => {
        if (action.payload === "A") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "D") {
          return b.name.localeCompare(a.name);
        } 
      });
      const sortedByNameInFiltered = [...state.filteredPokemons].sort((a, b) => {
        if (action.payload === "A") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "D") {
          return b.name.localeCompare(a.name);
        } 
      });
      // const uniqueSortedByName = sortedByName.filter(
      //   (pokemon, index, self) =>
      //     index === self.findIndex((p) => p.id === pokemon.id)
      // );

      return {
        ...state,
        pokemons: sortedByName,
        filteredPokemons: sortedByNameInFiltered,
        currentPage: 1
      };
    
    case SORT_POKEMONS_BY_STAT:
      if (action.payload === "") {
        return {
          ...state,
          pokemons: [...state.pokemons],
          filteredPokemons: [...state.filteredPokemons]
        }
      }
      const { stat, order } = action.payload;
      const sortedByStat = [...state.pokemons, ...state.getPkmns].sort((a, b) => {
        if (order === 'asc') {
          return a[stat] - b[stat];
        } else {
          return b[stat] - a[stat];
        }
      });
      const sortedByStatInFiltered = [...state.filteredPokemons].sort((a, b) => {
        if (order === 'asc') {
          return a[stat] - b[stat];
        } else {
          return b[stat] - a[stat];
        }
      });
      // const uniqueSortedByStat = sortedByStat.filter(
      //   (pokemon, index, self) =>
      //     index === self.findIndex((p) => p.id === pokemon.id)
      // );

      return {
        ...state,
        pokemons: sortedByStat,
        filteredPokemons: sortedByStatInFiltered,
        currentPage: 1
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons]
      }

    default:
      return state;
  }
};

export default reducer;