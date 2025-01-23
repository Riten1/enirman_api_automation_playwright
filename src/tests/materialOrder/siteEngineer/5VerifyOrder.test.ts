import test, { expect } from "@playwright/test";
import fs from "fs";
import { siteEngineerLoginData } from "../../../data/login";
import { siteEngineerLogin } from "../../../api/auth/siteEngineer/siteEngineerLogin.api";
import {
  getOrderDetail,
  verifyOrderQty,
  verifySubmissions,
} from "../../../api/materialOrder/siteEngineer/siteEngineerMaterialOrder.api";
const { orderId, orderItemId, purchaseOrderId } = JSON.parse(
  fs.readFileSync("./orderId.json", "utf8")
);
export let bearerToken: string;

test.describe.serial("Verify Order", () => {
  test.beforeAll(async () => {
    const response = await siteEngineerLogin(
      siteEngineerLoginData.email,
      siteEngineerLoginData.password
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(
      body.data?.tokens?.bearerToken,
      "Bearer token is missing"
    ).toBeDefined();

    bearerToken = body.data.tokens.bearerToken;
  });

  test("Get Delivered Order", async () => {
    const response = await getOrderDetail(bearerToken, orderId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.status).toBe("Delivered");
    expect(body.data.purchaseOrder[0].status).toBe("Delivered");
  });

  test("Verify Order", async () => {
    const response = await verifyOrderQty(
      bearerToken,
      purchaseOrderId,
      orderItemId,
      orderId,
      5
    );

    expect(response.status()).toBe(200);
  });

  test("Verify qty submission", async () => {
    const response = await verifySubmissions(bearerToken, orderId);

    expect(response.status()).toBe(200);
  });

  test("Get Verified Order", async () => {
    const response = await getOrderDetail(bearerToken, orderId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.status).toBe("Verified");
    expect(body.data.purchaseOrder[0].status).toBe("Delivered");
  });
});
