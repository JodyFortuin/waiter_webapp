let assert = require("assert");
let waiterFact = require("../waiter");

describe("Registration Database Unit Test", async function () {
  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://codex:pg123@localhost:5432/waiterdb";
  const pool = new Pool({
    connectionString,
  });

  beforeEach(async function () {
    await pool.query("delete from shift");
    await pool.query("delete from waiters");
  });

  describe("addWaiter()", async function () {
    it("should be able to insert a name in the Waiters table", async function () {
      let waiterFactory = waiterFact(pool);
      const INSERT_QUERY = await waiterFactory.addWaiter("Jack");

      assert.deepEqual([{ waiter: "Jack" }], await waiterFactory.getWaiters());
    });
  });

  describe("regex()", async function () {
    it("should capitalise the waiter name (Jody instead of jody)", function() {
      
      let waiterFactory = waiterFact(pool);

      assert.equal("Jody", waiterFactory.regex('jody'));
      });
    });

  describe("regex()", async function () {
  it("should add a waiter using only letters that are entered (Jody instead of $Jody123)", function() {
    
    let waiterFactory = waiterFact(pool);

    assert.equal("Jody", waiterFactory.regex('$Jody123'));
    });
  });

  describe("noName()", async function () {
    it("should be able to check if a name is entered (False)", async function () {
      let waiterFactory = waiterFact(pool);
      const INSERT_QUERY = await waiterFactory.addWaiter();

      assert.deepEqual(false, await waiterFactory.noName());
    });
  });

  describe("noName()", async function () {
    it("should be able to check if a name is entered (True)", async function () {
      let waiterFactory = waiterFact(pool);
      const INSERT_QUERY = await waiterFactory.addWaiter("Jody");

      assert.deepEqual(true, await waiterFactory.noName());
    });
  });

  describe("addShiftsForWaiter()", async function () {
    it("should be able to insert id of waiter and id of day into shift table", async function () {
      let waiterFactory = waiterFact(pool);

      await waiterFactory.addWaiter("Jack");

      await waiterFactory.addShiftsForWaiter("Jack", [1, 2]);

      // assert.deepEqual(false, await waiterFactory.noName());
    });
  });

  describe("color()", async function () {
    it("should change column name orange when below 3", async function () {
      let waiterFactory = waiterFact(pool);
      
      await waiterFactory.addWaiter("John");
      await waiterFactory.addWaiter("Jack");
      await waiterFactory.addShiftsForWaiter("John", [1]);
      await waiterFactory.addShiftsForWaiter("Jack", [1]);

      assert.deepEqual("bg-warning", await waiterFactory.color(2));
    });
  });

  describe("color()", async function () {
    it("should change column name green when = 3", async function () {
      let waiterFactory = waiterFact(pool);

      await waiterFactory.addWaiter("Jack");
      await waiterFactory.addWaiter("John");
      await waiterFactory.addWaiter("James");
      await waiterFactory.addShiftsForWaiter("Jack", [1]);
      await waiterFactory.addShiftsForWaiter("John", [1]);
      await waiterFactory.addShiftsForWaiter("James", [1]);

      assert.deepEqual("bg-green", await waiterFactory.color(3));
    });
  });

  describe("color()", async function () {
    it("should change column name red when above 3", async function () {
      let waiterFactory = waiterFact(pool);

      await waiterFactory.addWaiter("Jack");
      await waiterFactory.addWaiter("John");
      await waiterFactory.addWaiter("James");
      await waiterFactory.addWaiter("Jim");
      await waiterFactory.addShiftsForWaiter("Jack", [1]);
      await waiterFactory.addShiftsForWaiter("John", [1]);
      await waiterFactory.addShiftsForWaiter("James", [1]);
      await waiterFactory.addShiftsForWaiter("Jim", [1]);

      assert.deepEqual("bg-danger", await waiterFactory.color(4));
    });
  });
});
