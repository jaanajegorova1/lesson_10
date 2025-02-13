import { expect, test } from '@playwright/test'
import { UserDTO } from './DTO/UserDTO'

test('TL-14-5 get empty array for users test', async ({ request }) => {
  const allUsersResponse = await request.get('http://localhost:3000/users')
  const json: UserDTO[] = await allUsersResponse.json()

  expect(json.length).toBe(0)
})
