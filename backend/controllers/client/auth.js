const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const authController = {
  user: async (req, res) => {
    return res.json({ status: 200, data: req.user });
  },
  login: async (req, res) => {
    if (!req.body.email && !req.body.password) {
      return res.status(200).json({ status: 400, msg: "Thiếu tham số" });
    }

    const user = await prisma.users.findUnique({
      where: {
        email: req.body.email,
        password: CryptoJS.MD5(req.body.password).toString(),
      },
    });

    if (!user) {
      return res.status(200).json({
        status: -100,
        msg: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.id,
      },
      process.env.SERECT_KEY
    );

    return res.status(200).json({
      status: 200,
      msg: "Đăng nhập thành công",
      data: {
        token: token,
      },
    });
  },
  register: async (req, res) => {
    try {
      if (!req.body.name && !req.body.email && !req.body.password) {
        return res.status(200).json({ status: 400, msg: "Thiếu tham số" });
      }

      const user = await prisma.users.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res.status(200).json({
          status: -101,
          msg: "Email đã tồn tại, vui lòng đăng nhập",
        });
      }

      await prisma.users.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: CryptoJS.MD5(req.body.password).toString(),
        },
      });

      return res.json({ status: 200, msg: "Tạo tài khoản thành công" });
    } catch (error) {
      return res.status(200).json({ statys: 400, msg: error.message });
    }
  },
};

module.exports = authController;
