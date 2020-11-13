module.exports = function main(pool){

  /**
   * user enters name and select days
   *  -> string name, array of day_ids
   *  -> get enter user id -> if not found, add new user to db, return new id else return id
   *   -> insert into shifts
   * 
   *  -> show user selected days
   */


   /**
    * 
    * @param {String} userName 
    * @param {Array} day_ids 
    * 
    * @returns selected days for user
    */
   const workflow = async (userName, daysIds) => {

      const userId = await getUserId(userName); // return id

      if(userId) {
        await addShifts(userId, daysIds); // create this
        return await userSelectedDays(userId); // create this
      }
   }

   async function getUserId(userName){
      const SELECT_QUERY = await pool.query ('select id from waiters where waiter=$1', [userName])
      return SELECT_QUERY.rows;
   }

   async function addShifts(userId, daysIds){
      const INSERT_QUERY = await pool.query('insert into shifts(waiter_id, dayid) values($1, $2)', [userId, daysIds])
   }

   async function userSelectedDays(userId){
       
   }

   const getUserId = async (userName) => {
     // select where name = ? => [] 
     const sql = ('select id from shift where name=$1',[userName]) // edit this
    try {

      const results = await pool.query(sql, [userName]);
      return results.rows[0].id
      
    } catch (error) {
      await addUser(userName); // create this
      const results = await pool.query(sql, [userName]);
      return results.rows[0].id
    }

   }

}