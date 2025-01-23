import test, { expect } from "@playwright/test";
import { vendorLogin } from "../../../api/auth/vendor/vendorLogin.api";
import { vendorData } from "../../../data/login";
import fs from "fs";

import { getPurchaseOrderDetails } from "../../../api/materialOrder/vendor/vendorMaterialOrder.api";
const { purchaseOrderId, orderId } = JSON.parse(
  fs.readFileSync("./orderId.json", "utf8")
);

let bearerToken: string;
test.beforeAll(async () => {
  const response = await vendorLogin(
    vendorData.countryCode,
    vendorData.phoneNumber,
    vendorData.password
  );
  expect(response.status()).toBe(201);
  const body = await response.json();

  expect(
    body.data?.tokens?.bearerToken,
    "Bearer token is missing"
  ).toBeDefined();

  bearerToken = body.data.tokens.bearerToken;
});

test("Get purchase order details", async () => {
  const response = await getPurchaseOrderDetails(bearerToken, purchaseOrderId);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data?.id).toBe(purchaseOrderId);

  expect(body.data.order.id).toBe(orderId);
  expect(body.data.status).toBe("Delivered");
  expect(body.data.order.status).toBe("Verified");
});
