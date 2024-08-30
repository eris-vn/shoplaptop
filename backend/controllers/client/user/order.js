const { PrismaClient } = require("@prisma/client");
const { pagination } = require("prisma-extension-pagination");

const prisma = new PrismaClient().$extends(pagination());

module.exports = {
  list: async (req, res) => {
    const current_page = req.query.current_page ?? 1;

    const [list, paginate] = await prisma.orders
      .paginate({
        where: {
          user_id: req.user.id,
        },
        select: {
          id: true,
          total_price: true,
          status: true,
          order_details: {
            include: {
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      })
      .withPages({
        limit: 5,
        page: parseInt(current_page),
        includePageCount: true,
      });

    return res.json({
      status: 200,
      data: {
        list: list,
        paginate: paginate,
      },
    });
  },
  info: async (req, res) => {
    const id = req.query.id;
    const info = await prisma.orders.findFirst({
      where: {
        user_id: req.user.id,
        id: parseInt(id),
      },
      include: {
        address: true,
        order_details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!info) {
      return res.json({ status: -100, msg: "Không tìm thấy đơn hàng" });
    }

    return res.json({ status: 200, data: info });
  },
};
