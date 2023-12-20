const UsersData = require("../../Toms_Techveel_Data/Masters/Users");

const GetAllUsers = async (req, res, next) => {
  try {
    const Userslist = await UsersData.GetAllUsers();
    res.send(Userslist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const GetOneUsers = async (req, res, next) => {
  try {
    const Usersid = req.params.id;
    const UsersOne = await UsersData.GetOneUsers(Usersid);
    res.send(UsersOne);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const InsertUsers = async (req, res, next) => {
  try {
    const Users = req.body;
    const Userslist = await UsersData.InsertUsers(Users);
    res.send(Userslist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const UpdateUsers = async (req, res, next) => {
  try {
    const Usersid = req.params.id;
    const Users = req.body;
    const Userslist = await UsersData.UpdateUsers(Usersid, Users);
    res.send(Userslist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const DeleteUsers = async (req, res, next) => {
  try {
    const Usersid = req.params.id;

    const Userslist = await UsersData.DeleteUsers(Usersid);
    res.send(Userslist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  GetAllUsers: GetAllUsers,
  GetOneUsers: GetOneUsers,
  InsertUsers: InsertUsers,
  UpdateUsers: UpdateUsers,
  DeleteUsers: DeleteUsers,
};
