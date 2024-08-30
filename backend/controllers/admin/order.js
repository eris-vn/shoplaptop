const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

module.exports = {
  list: async (req, res) => {
    const list = await prisma.orders.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
      },
    });

    return res.json({ status: 200, data: list });
  },
  info: async (req, res) => {
    const id = req.query.id;
    const info = await prisma.orders.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        address: true,
        order_details: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy đơn hàng" });
    }

    return res.json({ status: 200, data: info });
  },
  update: async (req, res) => {
    const { id, status } = req.body;
    const info = await prisma.orders.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy đơn hàng" });
    }

    await prisma.orders.update({
      where: { id: id },
      data: {
        status: status,
      },
    });

    return res.json({ status: 200, msg: "Cập nhật thành công" });
  },
};
