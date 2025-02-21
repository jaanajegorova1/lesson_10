import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './DTO/OrderDto'

test('123 post order with correct data should receive code 201', async ({ request }) => {
  const response = await request.post(`https://backend.tallinn-learning.ee/test-orders`, {
    data: OrderDto.generateRandomOrderDto(),
  })
  const responseBody = OrderDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.status).toBe('OPEN')
})

test('post order with data without status field should receive code 200', async ({ request }) => {
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.generateOrderDtoWithoutStatus(),
  })
  const responseBody = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(responseBody.status).toBeNull()
  expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('post order with empty data should receive code 200', async ({ request }) => {
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.generateEmptyOrderDto(),
  })
  const responseBody = await response.json()

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.status).toBeNull()
})
