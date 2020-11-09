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

  it("should be able to insert a registration number", async function () {

    let waiterFactory = waiterFact(pool);
    const INSERT_QUERY = await waiterFactory.addDays(["name2"], "1");
 console.log(await waiterFactory.getWaiter());
 
    // assert.deepEqual([], await waiterFactory.getWaiter());

});

});