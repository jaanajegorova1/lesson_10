import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './DTO/OrderDto'
import { ApiClient } from '../api/ApiClient'

test.describe('Login tests with ApiClient', async () => {  test('TL-12-5 Successful authorization', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)

    expect(apiClient.jwt).not.toBeUndefined()
  })

  test('TL-12-6 Successful authorization and order creation', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    })
    console.log(await responseCreateOrder.text())

    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-7 Successful authorization, order creation and order status', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
    const createdOrder = OrderDto.serializeResponse(await responseCreateOrder.json())
    expect(createdOrder.id).toBeDefined()
    expect(createdOrder.id).toBeGreaterThan(0)

    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
      {
        headers: {
          Authorization: 'Bearer ' + apiClient.jwt,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDto.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('TL-12-8 Successful authorization, order creation, order status, order deletion', async ({
    request,
  }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    await apiClient.deleteOrder(orderId)

    const responseForDeletedOrderId = await request.get(
      `https://backend.tallinn-learning.ee/orders/${orderId}`,
      {
        headers: {
          Authorization: 'Bearer ' + apiClient.jwt,
        },
      },
    )
    expect(responseForDeletedOrderId.status).toBe(StatusCodes.OK)
    expect(apiClient.deleteOrder(orderId)).toBe('')
  })
})
