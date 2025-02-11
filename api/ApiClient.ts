import { LoginDTO } from '../tests/DTO/LoginDTO'
import { OrderDto } from '../tests/DTO/OrderDto'
import { StatusCodes } from 'http-status-codes'
import { APIRequestContext } from '@playwright/test'

const serverURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

export class ApiClient {
  static instance: ApiClient
  private request: APIRequestContext
  jwt: string = ''

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await this.instance.requestJwt()
    }

    return ApiClient.instance
  }

  async requestJwt(): Promise<void> {
    console.log('Requesting JWT')
    const responseLogin = await this.request.post(`${serverURL}${loginPath}`, {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    if (responseLogin.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${responseLogin.status()}`)
    }

    this.jwt = await responseLogin.text()
    console.log(`JWT received: ${this.jwt}`)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serverURL}${orderPath}`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + this.jwt,
      },
    })

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()

    return responseBody.id
  }

  async deleteOrder(orderId: number): Promise<void> {
    console.log('Delete order...')
    const responseDeletion = await this.request.delete(`${serverURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: 'Bearer ${this.jwt}'
      }
    })
    expect(responseDeletion.status()).toBe(true)
    const responseBody = await responseDeletion.json()
    expect(responseBody).toBe('')
  }
}
