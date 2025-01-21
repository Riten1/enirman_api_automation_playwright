export const adminMaterialOrderEndpoints = {
  getMaterialOrders: "/admin/company/workspace/material/order",
  approveOrder:
    "/admin/company/workspace/material/order/:orderId/finalize-order",

  approveOrderDetails:
    "/admin/company/workspace/material/order/requested/:orderId",

  placedOrderDetails: "/admin/company/workspace/material/order/:orderId",
};
