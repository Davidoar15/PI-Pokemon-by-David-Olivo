const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");

async function getPokemonByName(req, res) {
  const { name } = req.query;
  formattedName = name.toLowerCase();

  try {
    const pokemonDB = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${formattedName}%`
        }
      },
      include: [{ model: Type, as: "types" }],
    });

    const pokemonDataDB = pokemonDB.map((pokemon) => ({
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

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`);
    if (response.ok) {
      const data = await response.json();
      const filteredPokemons = data.results.filter((pokemon) =>
        pokemon.name.includes(formattedName));

      const pkmnPromises = filteredPokemons.map(async (pokemon) => {
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
        };
      });

      const pokemonDataAPI = await Promise.all(pkmnPromises);
      const combinedData = [...pokemonDataDB, ...pokemonDataAPI];

      if (combinedData.length > 0) {
        return res.status(200).json(combinedData);
      } else {
        return res.status(404).send(`${name} Not Found in DataBase or API`);
      }
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
  /*Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${formattedName}%`
      }
    },
    include: [{ model: Type, as: "types" }],
  })
    .then((pokemonDB) => {
      if (pokemonDB.length > 0) {
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
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Pokemon Not Found");
            }
          })
          .then((data) => {
            const filteredPokemons = data.results.filter((pokemon) =>
              pokemon.name.includes(formattedName)
            );
            return filteredPokemons;
          })
          .then(async (filteredPokemons) => {
            const pkmnPromises = filteredPokemons.map(async (pokemon) => {
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
            const pkmnList = await Promise.all(pkmnPromises); 
            res.status(200).json(pkmnList);
          })
          .catch((error) => {
            return res.status(404).send(`${name} Not Found`);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    });
}*/

module.exports = {
  getPokemonByName,
};
