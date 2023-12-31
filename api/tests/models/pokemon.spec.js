const { Pokemon, Type, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("Should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      }).timeout(3000);
      it("Should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
});

describe("Type model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Type.sync({ force: true }));
    describe("name", () => {
      it("Should throw an error if name is null", (done) => {
        Type.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      }).timeout(3000);
      it("Should work when its a valid name", () => {
        Type.create({ name: "Electric" });
      });
    });
  });
});
