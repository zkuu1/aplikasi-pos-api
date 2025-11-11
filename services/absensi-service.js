const { validate } = require('../validation/validation');
const { AbsensiValidation } = require('../validation/absensi-validation');
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');


const userAbsensi = async (request) => {
  try {
   
    const user = validate(AbsensiValidation, request);
    const absensi = await prisma.absensi.create({
      data: {
        name: user.name,
        IsMember: user.IsMember,
        date: user.date,
        status: user.status
      },
    });

    return {
      status: 'success',
      message: 'Absensi berhasil disimpan',
      data: absensi,
    };
  } catch (error) {
    throw new ResponseError(400, error.message || 'Gagal melakukan absensi');

  }
};



module.exports = {
  userAbsensi,
};
