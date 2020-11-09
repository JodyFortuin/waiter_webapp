module.exports = function waiterFactory(pool) {

    async function addWaiter(waiterName){
      const INSERT_WAITER = 'insert into waiters(waiter) values($1)';
      await pool.query(INSERT_WAITER, [waiterName]);
    }

    async function addDays(name, day){
        
      if(day === "1"){
        const INSERT_QUERY = 'insert into days(Monday) values($1)';
        const SELECT_QUERY = 'select Monday from days where Monday = $1';

        await pool.query(INSERT_QUERY, [name]);
        var select = await pool.query(SELECT_QUERY, [name]);
        // console.log(select.rows)
        //if(select.rows === 0){
        var newArray = select.rows.push()
        // console.log(newArray)

          
        } 
        // console.log(name)
      } 

      async function getWaiter(name){
        const SELECT_QUERY = await pool.query('select Monday from days where Monday = $1', [name]);
        return SELECT_QUERY.rows;
      }

    async function noName(){
      if (name === "")
      return "no name"
    }

  return {
      addWaiter,
      addDays,
      getWaiter,
      noName
  };
};

//const UPDATE_QUERY = 'update days set Monday = Monday + "waiter" from waiters where waiter = $1';
//await pool.query(UPDATE_QUERY, [name]);

/*if(day === "2"){
        const INSERT_QUERY2 = 'insert into days(Monday, Tuesday) values($1, $2)';
        await pool.query(INSERT_QUERY2, [name]);
      }*/
