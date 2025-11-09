const userModels = require('../models/users');
const userService = require('../services/user-service');


const register = async (req, res, next) => {
    try {
      const result = await userService.registerUser(req.body);
      res.status(200).json({
        message: 'Successfully created user',
        data: result
      });
    } catch (error) {
      next(error);
    }
}

const login = async (req, res, next) => {
   try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({
        message: 'Successfully logged in',
        data: result
    });
   } catch (error) {
    next(error);
   }
}

//  Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModels.getAllUsers();
    res.status(200).json({
      message: 'Successfully retrieved users',
      data: users
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Server error while retrieving users',
      error: error.message
    });
  }
};

//  Create new user
const createUser = async (req, res) => {
  try {
    const newUser = await userModels.createNewUser(req.body);
    res.status(201).json({
      message: 'Successfully created user',
      data: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Server error while creating user',
      error: error.message
    });
  }
};



//  Update existing user
const updateUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const updatedUser = await userModels.updateUser(idUser, req.body);
    res.status(200).json({
      message: 'Successfully updated user',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Server error while updating user',
      error: error.message
    });
  }
};

//  Delete user
const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await userModels.deleteUser(idUser);
    res.status(200).json({
      message: `Successfully deleted user with id ${idUser}`
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Server error while deleting user',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  createUser,
  updateUser,
  deleteUser
};
