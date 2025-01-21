import { request } from "@playwright/test";
import { adminloginEndpoints } from "../../../constants/auth/admin/adminLogin.endpoint";

export const adminLogin = async (
  email: string | undefined,
  password: string | undefined
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
  const response = await context.post(
    process.env.BASE_URL + adminloginEndpoints.adminLogin,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    }
  );

  return response;
};
