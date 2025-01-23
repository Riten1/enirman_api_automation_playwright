import { request } from "@playwright/test";
import { adminMaterialOrderEndpoints } from "../../../constants/materialOrder/admin/adminMaterialOrder.endpoints";
import { bearerToken } from "../../../tests/materialOrder/siteEngineer/1materialOrder.test";

export const getRequestedOrdersAdmin = async (
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
    `${process.env.BASE_URL}${adminMaterialOrderEndpoints.getMaterialOrders}?${queryString}`,
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

export const approveOrder = async (
  orderId: string,
  orderItemId: number | string | undefined,
  quantity: number,
  vendorId: number | string | undefined,
  bearerToken: string
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.put(
    `${process.env.BASE_URL}${adminMaterialOrderEndpoints.approveOrder.replace(
      ":orderId",
      orderId
    )}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      data: {
        orderItems: [
          {
            orderItemId: orderItemId,
            quantity,
            vendorId,
          },
        ],
      },
    }
  );

  return response;
};

export const getRequestedOrderDetails = async (
  orderId: string,
  bearerToken: string
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
  const response = await context.get(
    `${
      process.env.BASE_URL
    }${adminMaterialOrderEndpoints.approveOrderDetails.replace(
      ":orderId",
      orderId
    )}`,
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

export const getPlacedOrderDetails = async (
  orderId: string,
  bearerToken: string
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
  const response = await context.get(
    `${
      process.env.BASE_URL
    }${adminMaterialOrderEndpoints.placedOrderDetails.replace(
      ":orderId",
      orderId
    )}`,
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
