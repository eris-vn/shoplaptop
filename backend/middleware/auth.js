const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SERECT_KEY);
    const user = await prisma.users.findUnique({
      where: {
        id: data.user_id,
      },
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(200).send({ status: -401, msg: "Bạn chưa đăng nhập" });
  }
};
module.exports = auth;
