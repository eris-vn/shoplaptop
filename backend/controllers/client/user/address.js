const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

module.exports = {
  list: async (req, res) => {
    const address_list = await prisma.user_address.findMany({
      where: {
        user_id: req.user.id,
        status: 0,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.json({ status: 200, data: address_list });
  },
  info: async (req, res) => {
    const id = req.query.id;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const info = await prisma.user_address.findFirst({
      where: {
        id: parseInt(id),
        user_id: req.user.id,
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy địa chỉ" });
    }

    return res.json({ status: 200, data: info });
  },
  create: async (req, res) => {
    const { name, phone_number, address } = req.body;

    if (!name || !phone_number || !address) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const user = req.user;

    await prisma.user_address.create({
      data: {
        user_id: user.id,
        name: name,
        phone_number: phone_number,
        address: address,
      },
    });
    return res.json({ status: 200, msg: "Tạo địa chỉ thành công" });
  },
  update: async (req, res) => {
    const { id, name, address, phone_number } = req.body;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const info = await prisma.user_address.findFirst({
      where: {
        id: parseInt(id),
        user_id: req.user.id,
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy địa chỉ" });
    }

    await prisma.user_address.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        phone_number: phone_number,
        address: address,
      },
    });

    return res.json({ status: 200, msg: "Cập nhật thành công" });
  },
  delete: async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const info = await prisma.user_address.findFirst({
      where: {
        id: parseInt(id),
        user_id: req.user.id,
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy địa chỉ" });
    }

    await prisma.user_address.update({
      where: {
        id: info.id,
      },
      data: {
        status: 1,
      },
    });
    return res.json({ status: 200, msg: "Xoá thành công" });
  },
};
