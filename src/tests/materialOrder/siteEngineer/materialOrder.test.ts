import test, { expect } from "@playwright/test";
import { siteEngineerLogin } from "../../../api/auth/siteEngineer/siteEngineerLogin.api";
import { siteEngineerLoginData } from "../../../data/login";
import {
  getRequestedOrders,
  siteEngineerCreateOrder,
} from "../../../api/materialOrder/siteEngineer/siteEngineerMaterialOrder.api";
import fs from "fs";

export let bearerToken: string, orderId: string;

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

test("Create Material Order", async () => {
  const response = await siteEngineerCreateOrder(
    {
      siteId: "9",
      deliveryDate: new Date().toISOString(),
      itemList: [
        {
          itemId: "86",
          quantity: 10,
        },
      ],
    },
    bearerToken
  );
  const body = await response.json();
  expect(response.status(), "API call failed").toBe(201);
});

test("Get Requested Material Orders", async () => {
  const response = await getRequestedOrders(bearerToken, {
    status: "Requested",
    page: 1,
    limit: 10,
  });
  const body = await response.json();
  expect(response.status(), "API call failed").toBe(200);
  orderId = body.data.items[0].id;

  fs.writeFileSync("./orderId.json", JSON.stringify({ orderId }));
  expect(orderId).toBe(body.data.items[0].id);
});
