export const siteEngineerMaterialOrderEndpoints = {
  materialOrderRequest: "/site-engineer/material/create-order",
  getRequestedOrders: "/site-engineer/material/order",
  verifyOrderQty:
    "/site-engineer/material/order/:orderId/purchase-order/:purchaseOrderId/order-item/:orderItemId/approve-quanity",
  getOrderDetail: "/site-engineer/material/order/:orderId",
  verifySubmissions:
    "/site-engineer/material/order/:orderId/verify-submissions",
};
