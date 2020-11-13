let assert = require("assert");
let waiterFact = require("../waiter");

describe("Registration Database Unit Test",async function () {

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiterdb';
  const pool = new Pool({
    connectionString
  });

  beforeEach(async function () {
    await pool.query("delete from days");
    await pool.query("delete from waiters");
  });

  it("should be able to insert a name in the Waiters table", async function () {

    let waiterFactory = waiterFact(pool);
    const INSERT_QUERY = await waiterFactory.addWaiter("Jack");
 
    assert.deepEqual([{"waiter": "Jack"}], await waiterFactory.getWaiters());

});

  it("should be able to insert a name in the Days table", async function () {

  let waiterFactory = waiterFact(pool);
  const INSERT_QUERY = await waiterFactory.addId(["John"], "1");

  assert.deepEqual([{"monday": ["John"]}], await waiterFactory.getWaiterFromDays());

});

it("should be able to check if a name is entered", async function () {

  let waiterFactory = waiterFact(pool);
  const INSERT_QUERY = await waiterFactory.addWaiter();

  assert.deepEqual(false, await waiterFactory.noName());

  });
});