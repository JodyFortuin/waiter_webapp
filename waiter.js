module.exports = function waiterFactory(pool) {

  async function addWaiter(waiterName) {
    const INSERT_WAITER = await pool.query("insert into waiters(waiter) values($1)", [waiterName]); 
  }

  async function addShiftsForWaiter(name, day) {

    let wid = await getWaiterId(name);
    
    for (const shift of day) {
      await pool.query("insert into shift(waiter_id, dayid) values($1,$2)", [wid, shift]);
    }
  }

  async function getWaiterId(name){
    const waiterId = await pool.query("select id from waiters where waiter=$1",[name]);
    return waiterId.rows[0]["id"];
  }

  async function get(days) {
    
    for(const id of days){
   // const selectName = await pool.query("select waiter_id from shift where dayid=$1",[id]);
   const select = await pool.query(`select waiters.waiter
    from waiters
    inner join shift
    on waiters.id = shift.waiter_id
    inner join days
    on shift.dayid = days.id where dayid=$1`,[id]);
    console.log(select.rows)
    return select.rows;
    }
  }

  async function count(shift) {
    for (const id of shift){
      const selectCount = await pool.query("select count(*) from shift where dayid=$1",[id]);
      //console.log(selectCount.rows)
      return selectCount.rows
    }
  }

  async function color() {
    var count2 = count();
    if (count2 < 3) {
      return "bg-danger";
    }
    if ((count2 = 3)) {
      return "bg-green";
    }
    if (count2 > 3) {
      return "bg-warning";
    }
  }

  async function getWaiters() {
    const SELECT_QUERY = await pool.query("select waiter from waiters");
    return SELECT_QUERY.rows;
  }

  async function getDays() {
    const SELECT_QUERY = await pool.query("select day from days");
    return SELECT_QUERY.rows;
  }

  async function noName(name) {
    if (name === "") {
      return true;
    } else {
      return false;
    }
  }

  return {
    addWaiter,
    addShiftsForWaiter,
    getWaiters,
    getDays,
    noName,
    get,
    count,
    color,
    getWaiterId
  };
};

