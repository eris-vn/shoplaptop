const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const homeController = {
  categoryList: async (req, res) => {
    try {
      const response = await prisma.categories.findMany();
      res.status(200).json({ status: 200, data: response });
    } catch (error) {
      res.status(200).json({ statys: 400, msg: error.message });
    }
  },
  productList: async (req, res) => {
    try {
      const data = [
        {
          title: "Laptop bán chạy",
          freeship: true,
          slug: "laptop",
          products: await prisma.products.findMany({
            where: {
              category_id: 1,
            },
            include: {
              images: true,
              reviews: true,
            },
          }),
        },
        {
          title: "PC bán chạy",
          freeship: true,
          slug: "pc",
          products: await prisma.products.findMany({
            where: {
              category_id: 2,
            },
            include: {
              images: true,
              reviews: true,
            },
          }),
        },
      ];

      for (const category of data) {
        for (const product of category.products) {
          const totalReviews = product.reviews.length;
          let totalRating = 0;
          if (totalReviews > 0) {
            totalRating = product.reviews.reduce(
              (acc, review) => acc + review.rating,
              0
            );
          }
          const averageRating =
            totalReviews > 0 ? totalRating / totalReviews : 0;

          // thêm thông tin số lượng đánh giá và rating trung bình vào mỗi sản phẩm
          product.totalReviews = totalReviews;
          product.avgRating = averageRating.toFixed(1);

          delete product.reviews;
        }
      }

      res.status(200).json({ status: 200, data: data });
    } catch (error) {
      res.status(200).json({ statys: 400, msg: error.message });
    }
  },
};

module.exports = homeController;
