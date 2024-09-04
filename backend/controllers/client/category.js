const prisma = require("../../libs/prisma");

const categoryController = {
  productList: async (req, res) => {
    try {
      const current_page = parseInt(req.query.page) ?? 1;
      const per_page = parseInt(req.query.per_page) ?? 20;
      const categorySlug = req.params.category_slug;
      const priceSort = req.query.price;

      if (!categorySlug) {
        return res.status(200).json({ status: 400, msg: "Thiếu tham số" });
      }

      const category = await prisma.categories.findFirst({
        where: {
          slug: categorySlug,
        },
      });

      if (!category) {
        return res
          .status(200)
          .json({ status: 400, msg: "Không tìm thấy danh mục" });
      }

      // xử lý sắp xếp
      const orderBy = {};

      if (priceSort === "asc") {
        orderBy.price = "asc";
      } else if (priceSort === "desc") {
        orderBy.price = "desc";
      }

      // xử lý filter query
      const filterQuery = req.query.filters ? req.query.filters.split("&") : [];
      const filterConditions = {};

      filterQuery.forEach((filter) => {
        const [key, value] = filter.split("=");
        if (value) {
          filterConditions[key] = value.split(",");
        }
      });

      const [productList, paginate] = await prisma.products
        .paginate({
          where: {
            category_id: category.id,
            status: 0,
            AND: Object.entries(filterConditions).map(([key, values]) => ({
              product_attributes: {
                some: {
                  attribute_value: {
                    value: {
                      in: values,
                    },
                  },
                },
              },
            })),
          },
          include: {
            images: true,
          },
          orderBy: orderBy,
        })
        .withPages({
          limit: per_page,
          page: current_page,
          includePageCount: true,
        });

      res.status(200).json({
        status: 200,
        data: {
          products: {
            list: productList,
            paginate: paginate,
          },
          category: category,
        },
      });
    } catch (error) {
      res.status(200).json({ status: 400, msg: error.message });
    }
  },
  filter: async (req, res) => {
    const categorySlug = req.params.category_slug;

    if (!categorySlug) {
      return res.status(200).json({ status: 400, msg: "Thiếu tham số" });
    }

    const category = await prisma.categories.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      return res
        .status(200)
        .json({ status: 400, msg: "Không tìm thấy danh mục" });
    }

    const attributes = await prisma.attributes.findMany({
      where: {
        values: {
          some: {
            products: {
              some: {
                product: {
                  category_id: category.id,
                },
              },
            },
          },
        },
      },
      select: {
        name: true,
        value: true,
        values: {
          select: {
            name: true,
            value: true,
          },
        },
      },
    });

    res.status(200).json({
      status: 200,
      data: attributes,
    });
  },
};

module.exports = categoryController;
