const utils = require("../../Utill");
const config = require("../../../Config");

const sql = require("mssql");

const InsertUsers = async (Usersdata) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Masters/Users");
    const insertEvent = await pool
      .request()
      .input("UserCode", sql.VarChar(100), Usersdata.UserCode)      
      .input("UserName", sql.VarChar(50), Usersdata.UserName) 
      .input("UserPassWord", sql.VarChar(50), Usersdata.UserPassWord)
      .input("ActiveStatus", sql.Char(1), Usersdata.ActiveStatus)
      .input("CreatedBy", sql.BigInt, Usersdata.CreatedBy)
      .query(sqlQueries.InsertUsers);
    return insertEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

const GetAllUsers = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Masters/Users");
    const GetUsers = await pool.request().query(sqlQueries.GetAllUsers);
    return GetUsers.recordset;
  } catch (error) {
    return error.message;
  }
};

const GetOneUsers = async (Userid) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Masters/Users");
    const GetoneUsers = await pool
      .request()
      .input("Userid", sql.BigInt, Userid)
      .query(sqlQueries.GetOneUsers);
    return GetoneUsers.recordset;
  } catch (error) {
    return error.message;
  }
};

const UpdateUsers = async (Userid, Usersdata) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Masters/Users");
    const UpdateEvent = await pool
      .request()
      .input("Userid", sql.BigInt, Userid)
      .input("UserCode", sql.VarChar(100), Usersdata.UserCode)      
      .input("UserName", sql.VarChar(50), Usersdata.UserName) 
      .input("UserPassWord", sql.VarChar(50), Usersdata.UserPassWord)
      .input("ActiveStatus", sql.Char(1), Usersdata.ActiveStatus)      
      .input("ModifyBy", sql.BigInt, Usersdata.ModifyBy)
      .query(sqlQueries.UpdateUsers);
    return UpdateEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

const DeleteUsers = async (Userid) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Masters/Users");
    const deleteEvent = await pool
      .request()
      .input("Userid", sql.BigInt, Userid)
      .query(sqlQueries.DeleteUsers);
    return deleteEvent.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  GetAllUsers: GetAllUsers,
  GetOneUsers: GetOneUsers,
  InsertUsers: InsertUsers,
  UpdateUsers: UpdateUsers,
  DeleteUsers: DeleteUsers,
};
