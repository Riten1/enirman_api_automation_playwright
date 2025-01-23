import { request } from "@playwright/test";
import { siteEngineerMaterialOrderEndpoints } from "../../../constants/materialOrder/siteEngineer/siteEngineerMaterialOrder.enpoints";

interface IItemListProps {
  itemId: string | undefined;
  quantity: number | undefined;
}
interface IMaterialOrderDataProps {
  siteId: string | undefined;
  deliveryDate: string | undefined;
  itemList: IItemListProps[];
}

export const siteEngineerCreateOrder = async (
  data: IMaterialOrderDataProps,
  bearerToken: string
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.post(
    process.env.BASE_URL +
      siteEngineerMaterialOrderEndpoints.materialOrderRequest,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        siteId: data.siteId,
        deliveryDate: data.deliveryDate,
        itemList: data.itemList,
      },
    }
  );

  return response;
};

export const getRequestedOrders = async (
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
    `${process.env.BASE_URL}${siteEngineerMaterialOrderEndpoints.getRequestedOrders}?${queryString}`,
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

export const verifyOrderQty = async (
  bearerToken: string,
  purchaseOrderId: number | string,
  orderItemId: number | string,
  orderId: number | string,
  verifiedQuantity: number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.patch(
    process.env.BASE_URL +
      `/site-engineer/material/order/${orderId}/purchase-order/${purchaseOrderId}/order-item/${orderItemId}/approve-quanity`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      data: {
        verifiedQuantity,
      },
    }
  );

  return response;
};

export const getOrderDetail = async (
  bearerToken: string,
  orderId: string | number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.get(
    process.env.BASE_URL +
      siteEngineerMaterialOrderEndpoints.getOrderDetail.replace(
        ":orderId",
        String(orderId)
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

export const verifySubmissions = async (
  bearerToken: string,
  orderId: string | number
) => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.patch(
    process.env.BASE_URL +
      siteEngineerMaterialOrderEndpoints.verifySubmissions.replace(
        ":orderId",
        String(orderId)
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
