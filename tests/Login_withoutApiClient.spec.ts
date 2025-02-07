import { expect, test } from '@playwright/test'
import { LoginDTO } from './DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './DTO/OrderDto'

test.describe('Login tests without ApiClient', async () => {
  test('TL-12-1 Successful authorization', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.OK)
    expect(
      /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(await response.text()),
    ).toBeTruthy()
  })

  test('TL-12-2 Successful authorization and order creation', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    expect(responseLogin.status()).toBe(StatusCodes.OK)
    console.log(await responseLogin.text())

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDto.generateRandomOrderDto(), // data; {};
      headers: {
        // Content-type: plain/text
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    })

    console.log(await responseCreateOrder.text())
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-3 Successful authorization, order creation and order status', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDto.generateRandomOrderDto(), // data; {};
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
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
          Authorization: 'Bearer ' + (await responseLogin.text()),
        },
      },
    )

    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)

    const requestedOrder = OrderDto.serializeResponse(await responseOrderStatus.json())

    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('TL-12-4 Successful authorization, order creation, order status, order deletion', async ({
    request,
  }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDto.generateRandomOrderDto(), // data; {};
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    })

    const deleteOrder = OrderDto.serializeResponse(await responseCreateOrder.json())

    const responseDeleteOrder = await request.delete(
      `https://backend.tallinn-learning.ee/orders/${deleteOrder.id}`,
      {
        headers: {
          Authorization: 'Bearer ' + (await responseLogin.text()),
        },
      },
    )

    expect(responseDeleteOrder.status()).toBe(StatusCodes.OK)
  })
})
