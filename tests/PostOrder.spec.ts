import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './DTO/OrderDto'

test('123 post order with correct data should receive code 201', async ({ request }) => {
  // Send a POST request to the server
  const response = await request.post(`https://backend.tallinn-learning.ee/test-orders`, {
    data: OrderDto.generateRandomOrderDto(),
  })
  //const responseBodyRaw = await response.json();
  const responseBody = OrderDto.serializeResponse(await response.json())
  //const responseBody = await response.json(); //originalnaja zapis'
  //const responseBody = new OrderDto(await response.json()); // chtoby bylo ne any a vsegda konkretnyj tip orderaDto, 1yj sposob, json zhdjot vse shest' peremennyh so znachenijami
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.status).toBe('OPEN')
})

test('post order with data without status field should receive code 200', async ({ request }) => {
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.generateOrderDtoWithoutStatus(), //vnesli novuju funkciju bez polja status
  })
  const responseBody = await response.json()

  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(responseBody.status).toBe('OPEN') //expect(responseBody.status).toBeNull();
  expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('post order with empty data should receive code 200', async ({ request }) => {
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.generateEmptyOrderDto(),
  })
  const responseBody = await response.json()

  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.status).toBeNull()
})
