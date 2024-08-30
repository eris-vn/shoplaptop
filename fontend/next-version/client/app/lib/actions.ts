"use server";

import { signIn } from "../auth";

export async function authenticate(formData: any) {
  try {
    const session = await signIn("credentials", formData);
    return { code: 200, message: "Đăng nhập thành công" };
  } catch (err: any) {
    if (err.type === "AuthError") {
      return {
        code: -100,
        message: err.message,
      };
    }
    return {
      code: -100,
      message: err.message,
    };
  }
}
