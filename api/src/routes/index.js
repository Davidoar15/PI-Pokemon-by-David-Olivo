const { Router } = require('express');
const { getPokemons } = require('../controllers/getPokemons');
const { getPokemonByID } = require('../controllers/getPokemonByID');
const { getPokemonByName } = require('../controllers/getPokemonByName');
const { postPokemon } = require('../controllers/postPokemon');
const { getTypes } = require('../controllers/getTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons);
router.get('/pokemons/name', getPokemonByName);
router.get('/pokemons/:idPokemon', getPokemonByID);
router.post('/pokemons', postPokemon);
router.get('/types', getTypes);

module.exports = router;
