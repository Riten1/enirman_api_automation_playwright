import test, { expect } from "@playwright/test";
import { adminLogin } from "../../../api/auth/admin/adminLogin.api";
import { adminLoginData } from "../../../data/login";
import { getPlacedOrderDetails } from "../../../api/materialOrder/admin/adminMaterialOrder.api";
import fs from "fs";
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

  test("Verify delivered Order", async () => {
    const detailResponse = await getPlacedOrderDetails(orderId, bearerToken);

    const detailBody = await detailResponse.json();

    expect(detailBody.data.status).toBe("Delivered");
    expect(detailBody.data.purchaseOrder[0].status).toBe("Delivered");
  });
});
