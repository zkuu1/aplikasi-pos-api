const prisma = require('../client/prisma')

const getAllAbsensi= async() => {
    return await prisma.absensi.findMany();
}

module.exports = {
    getAllAbsensi
}