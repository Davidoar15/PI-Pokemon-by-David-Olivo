/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  image: "Image",
  hp: 35,
  attack: 55,
  defense: 40,
  spcatk: 50,
  spcdef: 50,
  speed: 90,
  height: 4,
  weight: 60,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe("GET /pokemons", () => {
    it("Should get 200", async () => {
      await agent.get("/pokemons").expect(200);
    }).timeout(4000);
  });

  describe("GET /pokemons/:idPokemon", () => {
    it("Should get 200", async () => {
      await agent.get("/pokemons/1").expect(200);
    });
    it('Respond with a object with properties: "id", "name", "image", "types", "hp", "attack", "defense", "spcatk", "spcdef", "speed", "height" and "weight"', async () => {
      const response = (await agent
          .get("/pokemons/1")).body;
      expect(response).to.have.property("id");
      expect(response).to.have.property("name");
      expect(response).to.have.property("image");
      expect(response).to.have.property("types");
      expect(response).to.have.property("hp");
      expect(response).to.have.property("attack");
      expect(response).to.have.property("defense");
      expect(response).to.have.property("spcatk");
      expect(response).to.have.property("spcdef");
      expect(response).to.have.property("speed");
      expect(response).to.have.property("height");
      expect(response).to.have.property("weight");
    });
    it("Should get 500", async () => {
      await agent.get("/pokemons/12345").expect(500);
    });
  })

  describe("GET /pokemons/name", () => {
    it("Should get 200", async () => {
      await agent.get("/pokemons/name?name=chimchar").expect(200);
    });
    it('Respond with a object with properties: "id", "name", "image", "types", "hp", "attack", "defense", "spcatk", "spcdef", "speed", "height" and "weight"', async () => {
      const response = (await agent
          .get("/pokemons/1")).body;
      expect(response).to.have.property("id");
      expect(response).to.have.property("name");
      expect(response).to.have.property("image");
      expect(response).to.have.property("types");
      expect(response).to.have.property("hp");
      expect(response).to.have.property("attack");
      expect(response).to.have.property("defense");
      expect(response).to.have.property("spcatk");
      expect(response).to.have.property("spcdef");
      expect(response).to.have.property("speed");
      expect(response).to.have.property("height");
      expect(response).to.have.property("weight");
    });
    it("Should get 404", async () => {
      await agent.get("/pokemons/name?name=Mario").expect(404);
    });
  })

  describe("POST /pokemons", () => {

    const Pkmn1 = {
      name: "Mew",
      image: "Image",
      types: ["psychic"],
      hp: 100,
      attack: 100,
      defense: 100,
      spcatk: 100,
      spcdef: 100,
      speed: 100,
      height: 100,
      weight: 100,
    }

    it("What you send by body must be returned", async() => {
      const response = await agent.post("/pokemons").send(Pkmn1);
      expect(response.body.name).to.equal(Pkmn1.name);
      expect(response.body.image).to.equal(Pkmn1.image);
      expect(response.body.hp).to.equal(Pkmn1.hp);
      expect(response.body.attack).to.equal(Pkmn1.attack);
      expect(response.body.defense).to.equal(Pkmn1.defense);
      expect(response.body.spcatk).to.equal(Pkmn1.spcatk);
      expect(response.body.spcdef).to.equal(Pkmn1.spcdef);
      expect(response.body.speed).to.equal(Pkmn1.speed);
      expect(response.body.height).to.equal(Pkmn1.height);
      expect(response.body.weight).to.equal(Pkmn1.weight);
    });
  });

  describe("GET /types", () => {
    it("Should get 200", async () => {
      await agent.get("/types").expect(200);
    }); 
  });
});
