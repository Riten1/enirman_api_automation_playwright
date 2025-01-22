import { request } from "@playwright/test";
import { vendorLoginEndpoints } from "../../../constants/auth/vendor/vendorLoginEndpoints";

export const vendorLogin = async (
  countryCode: string | undefined,
  phoneNumber: string | undefined,
  password: string | undefined
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.post(
    process.env.BASE_URL + vendorLoginEndpoints.loginThroughPassword,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        countryCode,
        phoneNumber,
        password,
        
      },
    }
  );

  return response;
};
