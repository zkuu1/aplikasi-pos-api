const logger = require('../logging');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
  ],
});

// Event listeners Prisma
prisma.$on('error', (e) => {
  logger.error(e);
});

prisma.$on('warn', (e) => {
  logger.warn(e);
});

prisma.$on('info', (e) => {
  logger.info(e);
});

prisma.$on('query', (e) => {
  logger.info(`[QUERY] ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
});

module.exports = prisma;
