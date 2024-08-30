const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  submit: async (req, res) => {
    try {
      const { address_id, payment_method, products } = req.body;
      if (!address_id || !payment_method || !products || products.length <= 0) {
        return res.status(200).json({ status: 400, msg: "Thiếu tham số" });
      }

      let total_price = 0;
      const productsList = [];

      for (const product of products) {
        const check = await prisma.products.findFirst({
          where: {
            id: product.id,
          },
        });

        if (check) {
          total_price += check.price * product.quantity;
          productsList.push({
            price: check.price,
            discount: check.discount,
            product_id: check.id,
            quantity: product.quantity,
          });
        }
      }

      if (!productsList.length) {
        return res.status(200).json({ status: 400, msg: "Giỏ hàng trống" });
      }

      const order = await prisma.orders.create({
        data: {
          user_id: req.user.id,
          address_id: address_id,
          payment_method: payment_method,
          note: "",
          status: 0,
          total_price: total_price,
          order_details: {
            create: productsList,
          },
        },
        include: {
          address: true,
        },
      });

      return res.json({
        status: 200,
        msg: "Đặt hàng thành công",
        data: {
          id: order.id,
          user: { name: req.user.name, email: req.user.email },
          address: order.address,
          total_price: total_price,
        },
      });
    } catch (err) {
      console.log(err);

      return res.json({ status: -100, msg: "Đặt hàng thất bại", error: err });
    }
  },
};
