const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");

function getPokemonByName(req, res) {
  const { name } = req.query;
  formattedName = name.toLowerCase();

  // Buscar en la DB
  Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: formattedName
      }
    },
    include: [{ model: Type, as: "types" }],
  })
    .then((pokemonDB) => {
      if (pokemonDB.length > 0) {
        // Pokemon encontrados en la DB
        const pokemonData = pokemonDB.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          types: pokemon.types.map((type) => type.name),
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          spcatk: pokemon.spcatk,
          spcdef: pokemon.spcdef,
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight,
        }));
        return pokemonData
          ? res.status(200).json(pokemonData)
          : res.status(404).send(`${name} Not Found in DataBase`);
      } else {
        // Si no se encuentra en la DB, buscar en la API
        fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Pokemon Not Found");
            }
          })
          .then((pokemonData) => {
            const pokemon = {
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.other["official-artwork"].front_default,
              types: pokemonData.types.map((type) => type.type.name),
              hp: pokemonData.stats[0].base_stat,
              attack: pokemonData.stats[1].base_stat,
              defense: pokemonData.stats[2].base_stat,
              spcatk: pokemonData.stats[3].base_stat,
              spcdef: pokemonData.stats[4].base_stat,
              speed: pokemonData.stats[5].base_stat,
              height: pokemonData.height,
              weight: pokemonData.weight,
            };
            res.status(200).json([pokemon]);
          })
          .catch((error) => {
            // No se encuentra el pokemon en la API
            return res.status(404).send(`${name} Not Found`);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    });
}

module.exports = {
  getPokemonByName,
};
