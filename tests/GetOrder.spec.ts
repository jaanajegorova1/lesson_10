import { expect, test } from '@playwright/test'

import { OrderDto } from './DTO/OrderDto'

test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  const responseBody = OrderDto.serializeResponse(await response.json())
  console.log('response body:', responseBody)
  console.log('response headers:', response.headers())
  expect.soft(response.status()).toBe(200)
  expect.soft(responseBody.courierId).toBeNull()
  expect.soft(responseBody.status).toBe('OPEN')
})

test('get order with id = 0', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(400)
})

test('get order with id equal %', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/%')
  console.log(response)
  expect(response.status()).toBe(400)
})

test('get order with id = first and get 400 error', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/first')
  console.log(response)
  expect(response.status()).toBe(400)
})

test('get order with empty id and get 500 error', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  console.log(response)
  expect(response.status()).toBe(500)
})
