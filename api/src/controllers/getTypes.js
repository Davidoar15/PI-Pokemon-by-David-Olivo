const axios = require("axios");
const { Type } = require("../db");

async function getTypes(req, res) {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const typesData = response.data.results;

    // Obtener los nombres de los tipos desde la respuesta de la API
    const typeNames = typesData.map((typeData) => typeData.name);

    // Buscar o crear los tipos en la base de datos
    const types = await Promise.all(
      typeNames.map((typeName) =>
        Type.findOrCreate({
          where: { name: typeName },
          defaults: { name: typeName },
          attributes: ["name"],
        })
      )
    );

    // Obtener solo los tipos creados o encontrados
    const foundTypes = types.map(([type]) => type);

    // Enviar respuesta al cliente
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
