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

          const hpStat = stats.find((stat) => stat.stat.name === 'hp');
          const hp = hpStat.base_stat;

          const attackStat = stats.find((stat) => stat.stat.name === 'attack');
          const attack = attackStat.base_stat;

          const defenseStat = stats.find((stat) => stat.stat.name === 'defense');
          const defense = defenseStat.base_stat;

          const spcatkStat = stats.find((stat) => stat.stat.name === 'special-attack');
          const spcatk = spcatkStat.base_stat;

          const spcdefStat = stats.find((stat) => stat.stat.name === 'special-defense');
          const spcdef = spcdefStat.base_stat;

          const speedStat = stats.find((stat) => stat.stat.name === 'speed');
          const speed = speedStat.base_stat;

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
        //res.setHeader('Cache-Control', 'no-store');
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