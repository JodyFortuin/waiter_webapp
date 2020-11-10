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
     //    console.log(select.rows)
     //var selectIndex = select.rows.rows[0].id;
     //var arr = [];
       // var newArray = arr.push()
        //console.log(selectIndex)
         //console.log(newArray)
          
        }
        // console.log(name)
      } 

      async function getWaiter(){
        const SELECT_QUERY = await pool.query('select waiter from waiters');
        return SELECT_QUERY.rows;
      }

      async function getWaiterFromDays(){
        const SELECT_QUERY = await pool.query('select Monday from days');
        return SELECT_QUERY.rows;
      }

    async function noName(name){
      if (name === ""){
        return true
      } else {
        return false
      }
    }

  return {
      addWaiter,
      addDays,
      getWaiter,
      getWaiterFromDays,
      noName
  };
};

//const UPDATE_QUERY = 'update days set Monday = Monday + "waiter" from waiters where waiter = $1';
//await pool.query(UPDATE_QUERY, [name]);

/*if(day === "2"){
        const INSERT_QUERY2 = 'insert into days(Monday, Tuesday) values($1, $2)';
        await pool.query(INSERT_QUERY2, [name]);
      }*/
