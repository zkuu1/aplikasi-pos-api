const { validate } = require('../validation/validation');
const { registerUserValidation, loginUserValidation } = require('../validation/user-validation');
const prisma = require('../client/prisma');
const { responseError } = require('../error/response-error');
const bcrypt = require('bcryptjs');
let uuidv4;

(async () => {
  const { v4 } = await import('uuid');
  uuidv4 = v4;
})();


const registerUser = async (request) => {
  const user = validate(registerUserValidation, request);

  // Cek apakah username atau email sudah terdaftar
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        { name: user.name },
        { email: user.email },
      ],
    },
  });

  if (userExists) {
    throw new responseError(400, 'Username or Email already registered');
  }

  // Hash password
  user.password = await bcrypt.hash(user.password, 10);

  // Buat user baru
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
};

const loginUser = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new responseError(401, 'Email or password is incorrect');
  }

  // Cek password
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new responseError(401, 'Email or password is incorrect');
  }

  // Buat token baru
  const token = uuidv4();

  // Simpan token ke user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { token },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
    },
  });

  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
};
