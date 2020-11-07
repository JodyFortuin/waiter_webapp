module.exports = function waiterFactory(pool) {

    async function addWaiter(waiterName){
      const INSERT_WAITER = 'insert into waiters(waiter) values($1)';
      await pool.query(INSERT_WAITER, [waiterName]);
    }

    async function addDays(name, day){
        
      if(day === "1"){
        const INSERT_QUERY = 'insert into days(Monday) values($1)';
        //const UPDATE_QUERY = 'update days set Monday = Monday + "waiter" from waiters where waiter = $1';
        await pool.query(INSERT_QUERY, [name]);
        //await pool.query(UPDATE_QUERY, [name]);
      } if(day === "2"){
        const INSERT_QUERY2 = 'insert into days(Monday, Tuesday) values($1, $2)';
        await pool.query(INSERT_QUERY2, [name]);
      }

        console.log(name)
      } 

    async function noName(){
      if (name === "")
      return "no name"
    }

  return {
      addWaiter,
      addDays,
      noName
  };
};
