import test, { expect } from "@playwright/test";
import { adminLogin } from "../../../api/auth/admin/adminLogin.api";
import { adminLoginData, vendorData } from "../../../data/login";
import {
  approveOrder,
  getPlacedOrderDetails,
  getRequestedOrderDetails,
  getRequestedOrdersAdmin,
} from "../../../api/materialOrder/admin/adminMaterialOrder.api";
import fs from "fs";
const { orderId } = JSON.parse(fs.readFileSync("./orderId.json", "utf8"));

let bearerToken: string;
let orderItemId: number | undefined;

test.describe.serial("Order Management Tests", () => {
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

  test("Get requested Order", async () => {
    const response = await getRequestedOrdersAdmin(bearerToken, {
      status: "Requested",
      page: 1,
      limit: 10,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    const orders = body.data.items;
    expect(orders.length).toBeGreaterThan(0);

   
    const requestedOrder = orders.find((order: any) => order.id === orderId);
  
    expect(requestedOrder.status).toBe("Requested");
  });

  test("Requested order details", async () => {
    const response = await getRequestedOrderDetails(orderId, bearerToken);
    expect(response.status()).toBe(200);

    const body = await response.json();

    const orderItems = body.data[0]?.orderItems;

    expect(orderItems).toBeDefined();
    expect(orderItems.length).toBeGreaterThan(0);

    orderItemId = orderItems[0]?.id;

    expect(orderItemId).toBeDefined();
  });

  test("Approve Order", async () => {
    const response = await approveOrder(
      orderId,
      orderItemId,
      10,
      vendorData.id,
      bearerToken
    );

    const body = await response.json();

    expect(response.status()).toBe(200);
  });

  test("Get Placed Order", async () => {
    const detailResponse = await getPlacedOrderDetails(orderId, bearerToken);

    const detailBody = await detailResponse.json();

    expect(detailBody.data.status).toBe("Placed");
  });
});
