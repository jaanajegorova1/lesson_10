import { test } from "@playwright/test";
import { Temp_ApiClient } from "../api/temp_ApiClient";

test("login and create order with api client", async ({ request }) => {
  const apiClient = await Temp_ApiClient.getInstance(request);
  const orderId = await apiClient.createOrderAndReturnOrderId();
  console.log("orderId:", orderId);
});
