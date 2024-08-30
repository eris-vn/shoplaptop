const { z } = require("zod");
const prisma = require("../../libs/prisma");
const { validate } = require("../../libs/validate");

module.exports = {
  list: async (req, res) => {
    const validateData = validate(
      {
        attribute_id: z.string(1, "Thiếu tham số"),
      },
      req.query
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const attribute_values = await prisma.attribute_values.findMany({
      where: {
        attribute_id: parseInt(req.query.attribute_id),
      },
    });

    return res.json({ status: 200, data: attribute_values });
  },
  create: async (req, res) => {
    const validateData = validate(
      {
        name: z.string().min(1, "Không bỏ trống tên thuộc tính"),
        value: z.string().min(1, "Không bỏ trống slug"),
        attribute_id: z.string(1, "Thiếu tham số"),
      },
      req.body
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const exist = await prisma.attribute_values.findFirst({
      where: {
        value: req.body.value,
      },
    });

    if (exist) {
      return res.json({ status: -100, msg: "Slug đã được sử dụng." });
    }

    await prisma.attribute_values.create({
      data: {
        attribute_id: parseInt(req.body.attribute_id),
        name: req.body.name,
        value: req.body.value,
      },
    });
    return res.json({ status: 200, msg: "Tạo giá trị thuộc tính thành công" });
  },
  info: async (req, res) => {
    const validateData = validate(
      {
        id: z.string().min(1, "Thiếu tham số"),
        attribute_id: z.string(1, "Thiếu tham số"),
      },
      req.query
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const attribute_values = await prisma.attribute_values.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });

    if (!attribute_values) {
      return res.json({ status: -100, msg: "Không tìm thấy thuộc tính." });
    }

    return res.json({ status: 200, data: attribute_values });
  },
  update: async (req, res) => {
    const validateData = validate(
      {
        id: z.number().min(1, "Thiếu tham số"),
        name: z.string().min(1, "Không bỏ trống tên thuộc tính"),
        value: z.string().min(1, "Không bỏ trống slug"),
        attribute_id: z.string(1, "Thiếu tham số"),
      },
      req.body
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const exist = await prisma.attribute_values.findFirst({
      where: {
        id: req.body.id,
      },
    });

    if (!exist) {
      return res.json({ status: -100, msg: "Không tìm thấy giá trị." });
    }

    if (exist.value != req.body.value) {
      const check = await prisma.attribute_values.findFirst({
        where: {
          value: req.body.value,
        },
      });

      if (check) {
        return res.json({ status: -100, msg: "Slug đã tồn tại." });
      }
    }

    await prisma.attribute_values.update({
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
      msg: "Chỉnh giá trị thuộc tính thành công",
    });
  },
};
