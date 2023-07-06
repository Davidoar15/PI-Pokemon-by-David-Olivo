const axios = require("axios");
const { Type } = require("../db");

async function getTypes(req, res) {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const typesData = response.data.results;

    const typeNames = typesData.map((typeData) => typeData.name);

    const types = await Promise.all(
      typeNames.map((typeName) =>
        Type.findOrCreate({
          where: { name: typeName },
          defaults: { name: typeName },
          attributes: ["name"],
        })
      )
    );

    const foundTypes = types.map(([type]) => type);

    return foundTypes.length > 0
      ? res.status(200).json(foundTypes)
      : res.status(404).send("Types Not Found");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTypes,
};
