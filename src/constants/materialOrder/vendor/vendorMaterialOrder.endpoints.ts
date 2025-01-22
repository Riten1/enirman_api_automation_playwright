export const vendorMaterialOrderEndpoints = {
  getNewOrders: "/vendor/purchase-order",
  readyToProcess: "/vendor/purchase-order/:purchaseOrderId/ready-to-process",
  getOrderDetails: "/vendor/purchase-order/:purchaseOrderId",
  readyToDelivery: "/vendor/purchase-order/:purchaseOrderId/ready-to-delivery",
  markAsDelivered: "/vendor/purchase-order/:purchaseOrderId/mark-as-delivered",
};
