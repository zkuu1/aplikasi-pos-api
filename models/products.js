const prisma = require('../client/prisma');

const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true
        }
    })
}