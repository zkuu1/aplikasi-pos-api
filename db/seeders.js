const prisma = require('../client/prisma')

async function main() {
  console.log('🌱 Seeding database...')

  // delete data
  await prisma.absensi.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // add user
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashedpassword123',
        address: 'Jl. Mawar No. 10',
        role: 'admin',
        membership: 'member',
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashedpassword456',
        address: 'Jl. Melati No. 12',
        role: 'user',
        membership: 'non_member',
      },
    ],
  })
  console.log(`Created ${users.count} users`)

  // Add Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Elektronik',
      description: 'Produk elektronik seperti HP, Laptop, dan Aksesoris.',
    },
  })
  const category2 = await prisma.category.create({
    data: {
      name: 'Fashion',
      description: 'Pakaian, sepatu, dan aksesoris fashion.',
    },
  })
  console.log('Created categories')

  // Add Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Asus ROG',
        description: 'Laptop gaming dengan performa tinggi',
        price: 22000000,
        stock: 10,
        categoryId: category1.id,
      },
      {
        name: 'Headphone Sony WH-1000XM5',
        description: 'Noise cancelling terbaik di kelasnya',
        price: 4500000,
        stock: 25,
        categoryId: category1.id,
      },
      {
        name: 'Jaket Kulit Pria',
        description: 'Jaket kulit premium untuk gaya kasual',
        price: 850000,
        stock: 15,
        categoryId: category2.id,
      },
    ],
  })
  console.log('Created products')

  // Tambah Absensi
  const userAlice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } })
  const userBob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } })

  if (userAlice && userBob) {
    await prisma.absensi.createMany({
      data: [
        {
      
          name: userAlice.name,
          date: new Date(),
          status: 'Hadir',
          isMember: true,
        },
        {
          
          name: userBob.name,
          date: new Date(),
          status: 'Tidak Hadir',
          isMember: false,
        },
      ],
    })
    console.log('Created absensi data')
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(' Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
