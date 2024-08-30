const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const uploadImage = require("../../libs/imageUploader");
const { validate } = require("../../libs/validate");
const { z } = require("zod");

const prisma = new PrismaClient();

const ProductStatus = Object.freeze({
  ACTIVE: 0,
  INACTIVE: 1,
});

module.exports = {
  list: async (req, res) => {
    const { category, page, itemsPerPage } = req.body;
    const current_page = page ?? 1;
    const per_page = itemsPerPage ?? 10;
    const total = await prisma.products.count();

    const list = await prisma.products.findMany({
      skip: (current_page - 1) * per_page,
      take: per_page,
      where: {
        ...(category && { category_id: category }),
      },
      select: {
        id: true,
        category_id: true,
        slug: true,
        name: true,
        price: true,
        status: true,
        created_at: true,
        images: true,
        category: true,
      },
    });

    return res.json({
      status: 200,
      data: list,
      paginate: { current_page, per_page, total },
    });
  },
  info: async (req, res) => {
    const id = req.query.id;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const info = await prisma.products.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        images: true,
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy sản phẩm" });
    }

    return res.json({ status: 200, data: info });
  },
  create: async (req, res) => {
    const validateData = validate(
      {
        name: z.string().min(1, "Không bỏ trống tên sản phẩm"),
        slug: z.string().min(1, "Không bỏ trống đường dẫn"),
        price: z
          .string()
          .transform((num) => parseInt(num))
          .pipe(z.number().min(1, "Giá tối thiểu là 1")),
        category_id: z.any().optional(),
        thumbnail: z.string().min(1, "Không bỏ trống ảnh sản phẩm"),
        status: z.number(),
      },
      req.body
    );

    if (!validateData.success) {
      return res.json({ status: -101, msg: validateData.message });
    }

    const {
      name,
      slug,
      short_description,
      description,
      thumbnail,
      images,
      price,
      discount_price,
      category_id,
      status,
    } = req.body;

    const exist = await prisma.products.findFirst({
      where: {
        slug: slug,
      },
    });

    if (exist) {
      return res.json({
        status: -100,
        msg: "Sản phẩm với slug đã tồn tại, vui lòng dùng slug khác",
      });
    }

    await prisma.$transaction(async (prisma) => {
      const thumbnail_url = await uploadImage(thumbnail);

      const product = await prisma.products.create({
        data: {
          brand_id: null,
          category_id: category_id ? parseInt(category_id) : null,
          slug: slug,
          name: name,
          thumbnail: thumbnail_url,
          short_description: short_description,
          description: description,
          price: parseInt(price),
          discount: parseInt(discount_price),
          status: status,
        },
      });

      for (const image of images) {
        const image_url = await uploadImage(image.url);

        await prisma.product_images.create({
          data: {
            product_id: product.id,
            image_url: image_url,
          },
        });
      }
    });

    return res
      .status(201)
      .json({ status: 200, msg: "Đăng sản phẩm thành công" });
  },
  update: async (req, res) => {
    const {
      id,
      name,
      slug,
      short_description,
      description,
      images,
      price,
      discount_price,
      category_id,
      status,
    } = req.body;

    if (!name || !slug || !description || !images || !price || !category_id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const product = await prisma.products.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return res.json({ status: -100, msg: "Không tìm thấy sản phẩm" });
    }

    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        brand_id: null,
        category_id: parseInt(category_id),
        slug: slug,
        name: name,
        short_description: short_description,
        description: description,
        price: parseInt(price),
        discount: parseInt(discount_price),
        status: status,
      },
    });

    for (const image of images) {
      if (!image.uploaded) {
        const image_url = await uploadImage(image.image);

        await prisma.product_images.create({
          data: {
            product_id: product.id,
            image_url: image_url,
          },
        });
      }
    }

    return res.json({ status: 200, msg: "Cập nhật thành công" });
  },
  delete: async (req, res) => {
    const id = req.body.id;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const product = await prisma.products.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return res.json({ status: -100, msg: "Không tìm thấy sản phẩm" });
    }

    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        status: 1,
      },
    });
    return res.json({ status: 200, msg: "Xoá thành công" });
  },
  delete_image: async (req, res) => {
    const id = req.body.id;

    if (!id) {
      return res.status(200).json({ status: -100, msg: "Thiếu tham số" });
    }

    const image = await prisma.product_images.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!image) {
      return res.json({ status: -100, msg: "Không tìm thấy sản phẩm" });
    }

    await prisma.product_images.delete({
      where: {
        id: image.id,
      },
    });
    return res.json({ status: 200, msg: "Xoá thành công" });
  },
  attribute: async (req, res) => {
    const attributes = await prisma.attributes.findMany({
      select: {
        name: true,
        value: true,
        values: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
      },
    });

    const transform = attributes.map((attribute) => {
      return {
        label: attribute.name,
        options: attribute.values.map((attribute_value) => {
          return {
            label: attribute_value.name,
            value: attribute_value.id,
            alias: [attribute.name, attribute.value],
          };
        }),
      };
    });

    res.status(200).json({
      status: 200,
      data: transform,
    });
  },
};
