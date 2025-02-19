import { expect, test } from '@playwright/test'
import { UsersApiClient } from '../api/UsersApiClient'

test.describe('User management app tests.', async () => {
  test('TL-14-6 Create one user, find user data by id and check that user is created', async ({
    request,
  }) => {
    const userApiClient = new UsersApiClient(request)
    await userApiClient.deleteAllUsers()

    const createdUser = await userApiClient.createUser()
    const returnedUser = await userApiClient.getUsersDataById(createdUser.id)

    expect(createdUser).toStrictEqual(returnedUser)
  })

  test('TL-14-7 Delete one created user, search deleted id and check that user is undefined', async ({
    request,
  }) => {
    const userApiClient = new UsersApiClient(request)
    await userApiClient.deleteAllUsers()

    const createdUser = await userApiClient.createUser()
    await userApiClient.deleteUser(createdUser.id)
    const returnedUser = await userApiClient.getUsersDataById(createdUser.id)

    expect(returnedUser.id).toBeUndefined()
  })

  test('TL-14-8 Create N users test', async ({ request }) => {
    const userApiClient = new UsersApiClient(request)
    await userApiClient.deleteAllUsers()
    await userApiClient.createUsers(7)

    expect((await userApiClient.getAllUsers()).length).toEqual(7)
  })

  test('TL-14-9 Create N users, delete all users, search deleted ids, check that users array is empty', async ({
    request,
  }) => {
    const userApiClient = new UsersApiClient(request)
    await userApiClient.deleteAllUsers()

    await userApiClient.createUsers(7)
    await userApiClient.deleteAllUsers()

    expect(await userApiClient.getAllUsers()).toEqual([])
  })
})
