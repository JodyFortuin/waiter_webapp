module.exports = function waiterFactory(pool) {

    async function addWaiter(waiterName){
      const INSERT_WAITER = 'insert into waiters(waiter) values($1)';
      await pool.query(INSERT_WAITER, [waiterName]);
    }

    async function addId(name, day){
      
     // if(day.includes("1")){
     //   const SELECT_WAITER = await pool.query ('select waiter from waiters where waiter=$1', [name]);

      // const SELECT_ID = 'select id from waiters where waiter=$1';
      let waiterid = await pool.query('select id from waiters where waiter=$1', [name]);

      if(waiterid.rows.length === 0){
        // const SELECT_ID = 'select id from waiters where waiter=$1';
       waiterid = await pool.query('select id from waiters where waiter=$1', [name]);
      // var wid = waiterid.rows[0].id;
      }
      for (const shift of day) {
       // if(day == shift){
        //  const SELECT_DAY = 'select id from days where day=$1';
         const dayid = await pool.query('select id from days where day=$1', [shift]);
         console.log(dayid.rows[0].id);
               const INSERT_WAITER = await pool.query ('insert into shift(waiter_id, dayid) values($1,$2)', [waiterid.rows[0].id, dayid.rows[0].id]);

        //  var did = dayid.rows[0].id;
        //}
      }
    //}
      /*
      const INSERT_WAITER = await pool.query ('insert into shift(waiter_id, dayid) values($1,$2)', [wid, did]);
        } if(day.includes("3")){ 
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid2, 2]);
      } if(day.includes("3")){
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid2, 3]);
      } if(day.includes("4")){
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid2, 4]);
      } if(day.includes("5")){
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid2, 5]);
      } if(day.includes("6")){
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid2, 6]);
      } if(day.includes("7")){
        const SELECT_WAITER = 'select id from waiters where waiter=$1';
        const waiterid2 = await pool.query(SELECT_WAITER, [name]);
        var wid2 = waiterid2.rows[0].id;
        
        const INSERT_WAITER = await pool.query ('insert into shift(waiterid, dayid) values($1,$2)', [wid2, 7]);
      }*/
    } 
    
    async function get(id){
      const selectName = await pool.query ('select waitername from shift where dayid=$1', [id]);
      return selectName.rows;
    }

    async function count(){
      const selectcount = await pool.query ('select count(*) from shift where dayid=1');
      return selectcount.rows;
    }

    async function color(){
      var count2 = count();
      if (count2 < 3) {
        return 'bg-danger';
        }
      if (count2 = 3) {
        return 'bg-green';
        }
    if (count2 > 3) {
        return 'bg-warning';
 }
    }

      async function getWaiters(){
        const SELECT_QUERY = await pool.query('select waiter from waiters');
        return SELECT_QUERY.rows;
      }

      async function getDays(){
        const SELECT_QUERY = await pool.query('select day from days');
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
      addId,
      getWaiters,
      getDays,
      noName,
      get,
      count,
      color
  };
};

//const UPDATE_QUERY = 'update days set Monday = Monday + "waiter" from waiters where waiter = $1';
//await pool.query(UPDATE_QUERY, [name]);

/*if(day === "2"){
        const INSERT_QUERY2 = 'insert into days(Monday, Tuesday) values($1, $2)';
        await pool.query(INSERT_QUERY2, [name]);
      }*/

/*    for(var i =0;i<week.length;i++){}
        for(const day of week){
          for(const i of day){
            if(day == i){
           var id = getDays(i);
           const SELECT_WAITER = 'select id from waiters where waiter=$1';
           const waiterid = await pool.query(SELECT_WAITER, [name]);
           var wid = waiterid.rows[0].id;

           const SELECT_DAY = 'select id from days where day=$1';
           const dayid = await pool.query(SELECT_DAY, [week]);
           var did = dayid.rows[0].id;

           const INSERT_WAITER = await pool.query ('insert into ids(waiterid, dayid) values($1,$2)', [wid, did]);

            console.log(did)
            //console.log(dayid.rows)
            //console.log(INSERT_WAITER.rows)
          }
         }
        }
   */