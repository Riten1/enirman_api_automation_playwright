import test, { expect } from "@playwright/test";
import fs from "fs";
import { adminLoginData } from "../../../data/login";
import { adminLogin } from "../../../api/auth/admin/adminLogin.api";
import {
  getPlacedOrderDetails,
  getRequestedOrderDetails,
} from "../../../api/materialOrder/admin/adminMaterialOrder.api";
const { orderId } = JSON.parse(fs.readFileSync("./orderId.json", "utf8"));
let bearerToken: string;

test.describe.serial("Verify Order", () => {
  test.beforeAll(async () => {
    const response = await adminLogin(
      adminLoginData.email,
      adminLoginData.password
    );

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(
      body.data?.tokens?.bearerToken,
      "Bearer token is missing"
    ).toBeDefined();

    bearerToken = body.data.tokens.bearerToken;
  });

  test("Verify Order", async () => {
    const response = await getPlacedOrderDetails(orderId, bearerToken);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.status).toBe("Verified");
    expect(body.data.purchaseOrder[0].status).toBe("Delivered");
  });
});
