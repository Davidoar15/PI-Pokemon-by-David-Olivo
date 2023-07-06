const axios = require('axios');

async function getPokemons(req, res) {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=55');
    const pokemonList = response.data.results;
    
    const pokemonPromises = pokemonList.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      const { id, name, sprites, stats, height, weight } = response.data;

      const image = sprites.other['official-artwork'].front_default;
      const types = response.data.types.map((type) => type.type.name);

      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const spcatk = stats[3].base_stat;
      const spcdef = stats[4].base_stat;
      const speed = stats[5].base_stat;

      return {
        id,
        name,
        image,
        types,
        hp,
        attack,
        defense,
        spcatk,
        spcdef,
        speed,
        height,
        weight
      }
    });

    const pokemonData = await Promise.all(pokemonPromises);
    return pokemonData 
      ? res.status(200).json(pokemonData)
      : res.status(404).send("Data Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getPokemons,
};