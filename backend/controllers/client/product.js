const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const productController = {
  info: async (req, res) => {
    try {
      const productSlug = req.body.slug;

      const product = await prisma.products.findFirst({
        where: {
          slug: productSlug,
        },
        include: {
          images: true,
        },
      });

      if (!product) {
        return res
          .status(200)
          .json({ status: -100, msg: "Không tìm thấy sản phẩm" });
      }

      if (product.status != 0) {
        return res
          .status(400)
          .json({ status: -100, msg: "Sản phẩm không bán nữa" });
      }

      return res.status(200).json({ status: 200, data: product });
    } catch (error) {
      return res.status(200).json({ statys: 400, msg: error.message });
    }
  },
  related: async (req, res) => {
    const productSlug = req.body.slug;

    const product = await prisma.products.findFirst({
      where: {
        slug: productSlug,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return res
        .status(200)
        .json({ status: -100, msg: "Không tìm thấy sản phẩm" });
    }

    const related_product = await prisma.products.findMany({
      where: {
        category_id: product.category_id,
      },
      include: {
        images: true,
      },
      take: 4,
    });

    return res.json({ status: 200, data: related_product });
  },
  list: async (req, res) => {
    const search = req.body.search || "";
    const page = parseInt(req.body.page) || 1; // Trang hiện tại, mặc định là trang 1
    const pageSize = parseInt(req.body.pageSize) || 10; // Số sản phẩm mỗi trang, mặc định là 10

    const totalProducts = await prisma.products.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        status: 0,
      },
      include: {
        images: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return res.json({
      status: 200,
      data: products,
      pagination: {
        page,
        pageSize,
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    });
  },
};

module.exports = productController;
