const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");

function getPkmnName(req, res) {
  const { name } = req.query;
  formattedName = name.toLowerCase();

  Pokemon.findAll({
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
          name: pokemon.name,
        }));
        return pokemonData
          ? res.status(200).json(pokemonData)
          : res.status(404).send(`${name} Not Found in DataBase`);
      } else {
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
              name: pokemonData.name,
            };
            res.status(200).json([pokemon]);
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
}

module.exports = {
  getPkmnName,
};