import test, { expect } from "@playwright/test";
import { vendorLogin } from "../../../api/auth/vendor/vendorLogin.api";
import { vendorData } from "../../../data/login";
import {
  getNewOrder,
  getPurchaseOrderDetails,
  markAsDelivered,
  readyToDelivery,
  readyToProcess,
} from "../../../api/materialOrder/vendor/vendorMaterialOrder.api";
import fs from "fs";
const { orderId } = JSON.parse(fs.readFileSync("./orderId.json", "utf8"));
let bearerToken: string;
let purchaseOrderId: number;
let orderItemId: number;

test.describe.serial("Change order status", () => {
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

  test("Get new orders", async () => {
    const response = await getNewOrder(bearerToken, {
      status: "NewOrder",
      page: 1,
      limit: 10,
    });

    const body = await response.json();
    const orders = body.data.items;
    expect(orders.length).toBeGreaterThan(0);

    const newOrder = orders.find((order: any) => order.order.id === orderId);
    purchaseOrderId = newOrder.id;
    fs.writeFileSync(
      "./orderId.json",
      JSON.stringify({ orderId, purchaseOrderId })
    );

    expect(newOrder.status).toBe("NewOrder");
    expect(newOrder.order.status).toBe("Placed");
  });

  test("Ready to process", async () => {
    const response = await readyToProcess(bearerToken, purchaseOrderId);

    expect(response.status()).toBe(200);
  });

  test("Get purchase order details", async () => {
    const response = await getPurchaseOrderDetails(
      bearerToken,
      purchaseOrderId
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data?.id).toBe(purchaseOrderId);

    expect(body.data.order.id).toBe(orderId);
    expect(body.data.status).toBe("InProgress");
    expect(body.data.order.status).toBe("Placed");

    orderItemId = body.data.orderItems[0].id;
    fs.writeFileSync(
      "./orderId.json",
      JSON.stringify({ orderId, purchaseOrderId, orderItemId })
    );
  });

  test("Ready To delivery", async () => {
    const response = await readyToDelivery(
      bearerToken,
      purchaseOrderId,
      false,
      0,
      0,
      0,
      orderItemId,
      5,
      20000
    );
    const body = await response.json();

    expect(response.status()).toBe(200);
  });

  test("Get purchase order details after ready to delivery ", async () => {
    const response = await getPurchaseOrderDetails(
      bearerToken,
      purchaseOrderId
    );
    console.log(response);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data?.id).toBe(purchaseOrderId);

    expect(body.data.order.id).toBe(orderId);
    expect(body.data.status).toBe("Shipping");
    expect(body.data.order.status).toBe("Placed");
  });

  test("Mark as delivered", async () => {
    const response = await markAsDelivered(bearerToken, purchaseOrderId);
    const body = await response.json();

    console.log("Response Status:", response.status());
    console.log("Response Body:", body);

    expect(response.status()).toBe(200);
  });
});
