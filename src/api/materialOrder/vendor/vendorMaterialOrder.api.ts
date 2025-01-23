import { request } from "@playwright/test";
import { vendorMaterialOrderEndpoints } from "../../../constants/materialOrder/vendor/vendorMaterialOrder.endpoints";
import { bearerToken } from "../../../tests/materialOrder/siteEngineer/1materialOrder.test";

export const getNewOrder = async (
  bearerToken: string,
  queryParams: Record<string, string | number | boolean>
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
  const queryString = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();

  const response = await context.get(
    `${process.env.BASE_URL}${vendorMaterialOrderEndpoints.getNewOrders}?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const readyToProcess = async (
  bearerToken: string,
  purchaseOrderId: number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.patch(
    process.env.BASE_URL +
      vendorMaterialOrderEndpoints.readyToProcess.replace(
        ":purchaseOrderId",
        String(purchaseOrderId)
      ),
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const getPurchaseOrderDetails = async (
  bearerToken: string,
  purchaseOrderId: number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.get(
    process.env.BASE_URL +
      vendorMaterialOrderEndpoints.getOrderDetails.replace(
        ":purchaseOrderId",
        String(purchaseOrderId)
      ),
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Playwright-Test",
      },
    }
  );
  console.log(
    "Request URL:",
    `${process.env.BASE_URL}/vendor/purchase-order/${purchaseOrderId}`
  );
  console.log("Bearer Token:", bearerToken);

  return response;
};

export const readyToDelivery = async (
  bearerToken: string,
  purchaseOrderId: number,
  isVatEnabled: boolean,
  labourCharge?: number,
  transportCharge?: number,
  discountRate?: number,
  itemId?: number,
  quantity?: number,
  rate?: number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.patch(
    process.env.BASE_URL +
      vendorMaterialOrderEndpoints.readyToDelivery.replace(
        ":purchaseOrderId",
        String(purchaseOrderId)
      ),
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      data: {
        isVatEnabled,
        labourCharge,
        transportCharge,
        discountRate,
        items: [
          {
            itemId,
            quantity,
            rate,
          },
        ],
      },
    }
  );

  return response;
};

export const markAsDelivered = async (
  bearerToken: string,
  purchaseOrderId: number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.patch(
    process.env.BASE_URL +
      vendorMaterialOrderEndpoints.markAsDelivered.replace(
        ":purchaseOrderId",
        String(purchaseOrderId)
      ),
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
