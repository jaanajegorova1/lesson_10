import { expect, test } from "@playwright/test";
import { StatusCodes } from "http-status-codes";
import { UserDTO } from "./DTO/UserDTO";
import { APIRequestContext } from "playwright";

test.describe("User management app tests", async () => {
  const clearUser = async (
    id: number,
    request: APIRequestContext,
  ): Promise<void> => {
    await request.delete(`http://localhost:3000/users/${id}`);
  };
  test("TL-14-5 get empty array for users test", async ({
    request,
  }): Promise<void> => {
    const allUsersResponse = await request.get("http://localhost:3000/users");
    const json = await allUsersResponse.json();

    expect(json.length).toBe(0);
    expect(allUsersResponse.json).toBe(`[]`);
  });
});
