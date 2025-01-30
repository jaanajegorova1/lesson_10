import { expect, test } from '@playwright/test'
import { LoginDTO } from './DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'

test.describe('Login tests', async () => {
  test('Successful authorization', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.OK)
    expect(
      /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(await response.text()),
    ).toBeTruthy()
  })

  test('Unsuccessful authorization using not allowed method PUT', async ({ request }) => {
    const response = await request.put('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization using not allowed method DELETE', async ({ request }) => {
    const response = await request.delete('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization with incorrect credentials', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithIncorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
