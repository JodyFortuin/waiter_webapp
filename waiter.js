module.exports = function waiterFactory(pool) {

    async function addWaiter(waiterName){
      const INSERT_WAITER = 'insert into waiters(waiter) values($1)';
      await pool.query(INSERT_WAITER, [waiterName]);
    }

    async function addDays(name){
        
        const INSERT_QUERY = 'insert into days(Monday) values($1)';
        await pool.query(INSERT_QUERY, [name]);
        console.log(name)
      } 

  return {
      addWaiter,
      addDays
  };
};
