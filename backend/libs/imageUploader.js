const axios = require("axios");

async function uploadImage(base64Image) {
  const data = {
    image: base64Image,
  };

  try {
    const response = await axios.post(
      "https://image.shoperis.net/upload",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );

    if (response.data.code == 200) {
      return response.data.data.url;
    }

    throw Error(response.data.msg ?? "Đăng ảnh thất bại");
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
}

module.exports = uploadImage;
