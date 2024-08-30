const { z, ZodError } = require("zod");

function validate(object, data) {
  try {
    z.object(object).parse(data);
    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      let errorMessage = firstError.message;

      if (errorMessage === "Required") {
        const fieldPath = firstError.path.join(".");
        errorMessage = `Thiếu tham số`;
      }

      return { success: false, message: errorMessage };
    }
    return { success: false, message: "Unknown error occurred" };
  }
}

module.exports = { validate };
