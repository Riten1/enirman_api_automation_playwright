import { request } from "@playwright/test";
import { siteEngineerLoginEndpoints } from "../../../constants/auth/siteEngineer/siteEngineerLogin.enpoint";

export const siteEngineerLogin = async (
  email: string | undefined,
  password: string | undefined
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.post(
    process.env.BASE_URL + siteEngineerLoginEndpoints.engineerLogin,
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
