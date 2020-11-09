let assert = require("assert");
let waiterFact = require("../waiter");

describe("Registration Database Unit Test", function () {

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiterdb';
  const pool = new Pool({
    connectionString
  });

  beforeEach(async function () {
    await pool.query("delete from waiters");
    await pool.query("delete from days");
  });

  it("should be able to insert a registration number", async function () {

    let waiterFactory = waiterFact(pool);
    const INSERT_QUERY = await waiterFactory.addWaiter("name2");
 
    assert.deepEqual([], await waiterFactory.getWaiter());

});

});