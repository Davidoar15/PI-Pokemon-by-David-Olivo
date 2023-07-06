const { Pokemon, Type } = require("../db");
const axios = require("axios");

async function getPokemonByID(req, res) {
  const { idPokemon } = req.params;

  try {
    let pokemonData;
    
    if (idPokemon.length === 36) {
      const pokemonDB = await Pokemon.findByPk(idPokemon, { include: Type });
      if (pokemonDB) {
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
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const { id, name, sprites, stats, height, weight } = response.data;

      const image = sprites.other["official-artwork"].front_default;
      const types = response.data.types.map((typeData) => typeData.type.name);

      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const spcatk = stats[3].base_stat;
      const spcdef = stats[4].base_stat;
      const speed = stats[5].base_stat;

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
