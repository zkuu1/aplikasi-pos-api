// models/users.js
const prisma = require('../client/prisma');

// Ambil semua user
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Buat user baru
const createNewUser = async (body) => {
  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      address: body.address,
      token: body.token || null,
      role: body.role || 'user',
      membership: body.membership || 'non_member',
      createdAt: new Date(),
    },
  });
};

// Update user
const updateUser = async (idUser, body) => {
  return await prisma.user.update({
    where: { id: Number(idUser) },
    data: {
      name: body.name,
      email: body.email,
      address: body.address,
      role: body.role,
      membership: body.membership,
    },
  });
};

// Hapus user
const deleteUser = async (idUser) => {
  return await prisma.user.delete({
    where: { id: Number(idUser) },
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
