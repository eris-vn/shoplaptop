const { z } = require("zod");
const prisma = require("../../libs/prisma");
const { validate } = require("../../libs/validate");

module.exports = {
  list: async (req, res) => {
    const attributes = await prisma.attributes.findMany({
      include: {
        _count: {
          select: {
            values: true,
          },
        },
      },
    });

    return res.json({ status: 200, data: attributes });
  },
  create: async (req, res) => {
    const validateData = validate(
      {
        name: z.string().min(1, "Không bỏ trống tên thuộc tính"),
        value: z.string().min(1, "Không bỏ trống slug"),
      },
      req.body
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const exist = await prisma.attributes.findFirst({
      where: {
        value: req.body.value,
      },
    });

    if (exist) {
      return res.json({ status: -100, msg: "Slug đã được sử dụng." });
    }

    await prisma.attributes.create({
      data: {
        name: req.body.name,
        value: req.body.value,
      },
    });
    return res.json({ status: 200, msg: "Tạo thuộc tính thành công" });
  },
  info: async (req, res) => {
    const validateData = validate(
      {
        id: z.string().min(1, "Không bỏ trống tham số"),
      },
      req.query
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const attribute = await prisma.attributes.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });

    if (!attribute) {
      return res.json({ status: -100, msg: "Không tìm thấy thuộc tính." });
    }

    return res.json({ status: 200, data: attribute });
  },
  update: async (req, res) => {
    const validateData = validate(
      {
        id: z.number().min(1, "Thiếu tham số"),
        name: z.string().min(1, "Không bỏ trống tên thuộc tính"),
        value: z.string().min(1, "Không bỏ trống slug"),
      },
      req.body
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const exist = await prisma.attributes.findFirst({
      where: {
        id: req.body.id,
      },
    });

    if (!exist) {
      return res.json({ status: -100, msg: "Không tìm thấy giá trị." });
    }

    if (exist.value != req.body.value) {
      const check = await prisma.attributes.findFirst({
        where: {
          value: req.body.value,
        },
      });

      if (check) {
        return res.json({ status: -100, msg: "Slug đã tồn tại." });
      }
    }

    await prisma.attributes.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        value: req.body.value,
      },
    });
    return res.json({
      status: 200,
      msg: "Chỉnh thuộc tính thành công",
    });
  },
};
