const { Pokemon, Type } = require("../db");
const axios = require("axios");

async function getPokemonByID(req, res) {
  const { idPokemon } = req.params;

  try {
    let pokemonData;
    
    if (idPokemon.length === 36) {
      // Verificar si el Pokémon existe en la DB
      const pokemonDB = await Pokemon.findByPk(idPokemon, { include: Type });
      if (pokemonDB) {
        // Si existe en la DB, obtener los datos de la DB
        pokemonData = {
          id: pokemonDB.id,
          name: pokemonDB.name,
          image: pokemonDB.image,
          types: pokemonDB.types.map((type) => type.name),
          hp: pokemonDB.hp,
          attack: pokemonDB.attack,
          defense: pokemonDB.defense,
          spcatk: pokemonDB.spcatk,
          spcdef: pokemonDB.spcdef,
          speed: pokemonDB.speed,
          height: pokemonDB.height,
          weight: pokemonDB.weight,
        };
      }
    } else {
      // Si no existe en la DB, obtener los datos desde la API
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const { id, name, sprites, stats, height, weight } = response.data;

      const image = sprites.other["official-artwork"].front_default;
      const types = response.data.types.map((typeData) => typeData.type.name);

      const hpStat = stats.find((stat) => stat.stat.name === "hp");
      const hp = hpStat.base_stat;

      const attackStat = stats.find((stat) => stat.stat.name === "attack");
      const attack = attackStat.base_stat;

      const defenseStat = stats.find((stat) => stat.stat.name === "defense");
      const defense = defenseStat.base_stat;

      const spcatkStat = stats.find(
        (stat) => stat.stat.name === "special-attack"
      );
      const spcatk = spcatkStat.base_stat;

      const spcdefStat = stats.find(
        (stat) => stat.stat.name === "special-defense"
      );
      const spcdef = spcdefStat.base_stat;

      const speedStat = stats.find((stat) => stat.stat.name === "speed");
      const speed = speedStat.base_stat;

      pokemonData = {
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
        weight,
      };
    }
    return pokemonData
      ? res.status(200).json(pokemonData)
      : res.status(404).send("Pokemon Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getPokemonByID,
};
