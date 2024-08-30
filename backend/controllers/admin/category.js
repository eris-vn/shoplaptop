const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

function isBase64Image(str) {
  return /^data:image\/([a-zA-Z]*);base64,/.test(str);
}

module.exports = {
  info: async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.json({ status: -100, msg: "Thiếu tham số" });
    }

    const category = await prisma.categories.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return res.json({ status: -101, msg: "Không tìm thấy danh mục" });
    }

    return res.json({ status: 200, data: category });
  },
  list: async (req, res) => {
    const list = await prisma.categories.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.json({ status: 200, data: list });
  },
  create: async (req, res) => {
    const { title, slug, image } = req.body;

    const category = await prisma.categories.findFirst({
      where: {
        slug: slug,
      },
    });

    if (category) {
      return res.json({
        status: -100,
        msg: "Slug đã tồn tại vui lòng dùng slug khác",
      });
    }

    // đăng ảnh
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `uploads/image_${Date.now()}.png`;

    fs.writeFile(fileName, buffer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading image");
      }
    });

    await prisma.categories.create({
      data: {
        name: title,
        slug: slug,
        image_url: `http://localhost:4000/${fileName}`,
      },
    });

    if (!title || !slug || !image) {
      return res.json({ status: -100, msg: "Thiếu tham số" });
    }

    return res.json({ status: 200, msg: "Tạo danh mục thành công" });
  },
  update: async (req, res) => {
    const { id, title, slug, image } = req.body;

    const category = await prisma.categories.findFirst({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.json({ status: -101, msg: "Không tìm thấy danh mục" });
    }
    let image_url = image;

    if (isBase64Image(image)) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `uploads/image_${Date.now()}.png`;

      fs.writeFile(fileName, buffer, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error uploading image");
        }
      });

      image_url = `http://localhost:4000/${fileName}`;
    }

    await prisma.categories.update({
      where: {
        id: category.id,
      },
      data: {
        name: title,
        slug: slug,
        image_url: image_url,
      },
    });

    return res.json({ status: 200, msg: "Cập nhật thành công" });
  },
  delete: async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.json({ status: -100, msg: "Thiếu tham số" });
    }

    const category = await prisma.categories.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return res.json({ status: -101, msg: "Không tìm thấy danh mục" });
    }

    await prisma.categories.delete({
      where: {
        id: category.id,
      },
    });
    return res.json({ status: 200, msg: "Xoá thành công" });
  },
};
