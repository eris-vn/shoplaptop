const { PrismaClient } = require("@prisma/client");
const { pagination } = require("prisma-extension-pagination");

const prisma = new PrismaClient().$extends(pagination());

module.exports = prisma;
