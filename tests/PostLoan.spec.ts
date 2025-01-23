import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanDto } from './DTO/LoanDto'
//#1
test('Negative decision to receive loan should receive code 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generateNegativeDecisionLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskPeriods).toStrictEqual([])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('negative')
})
//#2
test('Successful decision of loan with correct data and Medium Risk should receive code 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generatePositiveDecisionMediumRiskLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  console.log('Risk level for your loan defined as:', responseBody.riskLevel)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toStrictEqual([6, 9, 12]) //.toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskDecision).toBe('positive') //.toBeDefined()
})
//#3
test('Successful decision of loan with correct data and Low Risk should receive code 200', async ({
  request,
}) => {
 const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generatePositiveDecisionLowRiskLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  console.log('Risk level for your loan defined as:', responseBody.riskLevel)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toStrictEqual([12, 18, 24, 30, 36]) //.toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskDecision).toBe('positive')
})
//#4
test('Positive decision of loan with correct data and High Risk should receive code 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generatePositiveDecisionHighRiskLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  console.log('Risk level for your loan defined as:', responseBody.riskLevel)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toStrictEqual([3, 6]) //.toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskDecision).toBe('positive')
})
//#5
test('Negative decision of loan with correct data and Very High Risk should receive code 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generateNegativeDecisionVeryHighRiskLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  console.log('Risk level for your loan defined as:', responseBody.riskLevel)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toStrictEqual([])
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskDecision).toBe('negative')
})
//#6
test('Negative decision of loan for young customer and Very High Risk should receive code 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generateNegativeDecisionYongCustomerLoanDto(),
    },
  )
  const responseBody = LoanDto.serializeResponse(await response.json())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  console.log('Decision to loan:', responseBody.riskDecision)
  console.log('Risk level for your loan defined as:', responseBody.riskLevel)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toStrictEqual([])
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskDecision).toBe('negative')
})
//#7
test('Empty loan dto should receive code 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDto.generateEmptyLoanDto(),
    },
  )
  const responseBody = await response
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  //Soft check:
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
