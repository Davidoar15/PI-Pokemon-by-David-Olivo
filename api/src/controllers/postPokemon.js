const { Pokemon, Type } = require('../db');

async function postPokemon(req, res) {
    try {
        const { name, image, types, hp, attack, defense, spcatk, spcdef, speed, height, weight } = req.body;
        if (!name || !image || !types || !hp || !attack || !defense || !spcatk || !spcdef || !speed || !height || !weight) {
            return res.status(401).send("Missing Data");
        }

        const newPokemon = await Pokemon.create({ // Crear al Pokemon en la DB
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
        });
                
        const existingTypes = await Type.findAll({ // Buscar los tipos existentes en la DB
            where: { name: types }
        });
        const newTypes = types.filter((typeName) => { // Crear nuevos tipos si no existen en la DB
            return !existingTypes.some((type) => type.name === typeName);
        });
        const createdTypes = await Type.bulkCreate(
            newTypes.map((typeName) => ({ name: typeName }))
        );
        const allTypes = [...existingTypes, ...createdTypes]; // Combinar los tipos existentes y los recién creados
        await newPokemon.setTypes(allTypes); // Establecer las asociaciones entre el nuevo Pokémon y los tipos

        return res.status(201).json(newPokemon);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

module.exports = {
    postPokemon,
};