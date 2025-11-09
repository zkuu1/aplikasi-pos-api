const express = require('express');
const userController = require('../controller/user-controller');

const router = express.Router();

router.get('/', userController.getAllUsers);

// Create User - POST
router.post('/', userController.register);

// login
router.post('/login', userController.login);

// Update User - PATCH
router.patch('/:idUser', userController.updateUser);

// Delete User - DELETE
router.delete('/:idUser', userController.deleteUser);

module.exports = router;