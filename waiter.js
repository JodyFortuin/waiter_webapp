module.exports = function waiterFactory(pool) {


  async function getSchedule() {
    const sql = `select * from waiters
    inner join shift
    on waiters.id = shift.waiter_id
    inner join days
    on shift.dayid = days.id`;
    
    const result = await pool.query(sql);

    return result.rows;
  }


  async function addWaiter(waiterName) {
    const INSERT_WAITER = await pool.query("insert into waiters(waiter) values($1)", [waiterName]); 
  }

  async function addShiftsForWaiter(name, day) {

    let wid = await getWaiterId(name);
    
    if(day){
    for (const shift of day) {
      await pool.query("insert into shift(waiter_id, dayid) values($1,$2)", [wid, shift]);
    }
  }
}

  async function getWaiterId(name){
    if(name){
    const waiterId = await pool.query("select id from waiters where waiter=$1",[name]);
    return waiterId.rows[0]["id"];
  }
}

  async function get(days) {
    
    for(const id in days){
   const select = await pool.query(`select *
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
    for (const id in shift){
      const selectCount = await pool.query("select count(*) from shift where dayid=$1",[id]);
      //console.log(selectCount.rows)
      return selectCount.rows
    }
  }

   function color(count) {
    if (count < 3) {
      return "bg-danger";
    }
    if ((count = 3)) {
      return "bg-green";
    }
    if (count > 3) {
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

  function noName(name) {
    if (name === "") {
      return true;
    } else {
      return false;
    }
  }

  async function joinShift() {
    const weekdays = await getDays();
    const shifts = await getSchedule();

    weekdays.forEach(function(days) {
      days.waiters = [];
      shifts.forEach((waiter) => {
        if(waiter.day === days.day) {
            days.waiters.push(waiter)
        }

        days.color = color(days.waiters.length)
        
      })
    })

    return weekdays;
  }

  async function reset(){
    const DELETE_SHIFT = await pool.query("delete from shift");
    return true;
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
    getWaiterId,
    joinShift,
    reset
  };
};

