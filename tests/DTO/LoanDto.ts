import { ResponseLoan } from './ResponseLoan'

export class LoanDto {
  income: number;
  debt: number;
  age: number;
  employed: boolean;
  loanAmount: number;
  loanPeriod: number;

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateNegativeDecisionLoanDto(): LoanDto {
    return new LoanDto(100, 0, 17, true, 1000, 12)
  }

  static generatePositiveDecisionMediumRiskLoanDto(): LoanDto {
    return new LoanDto(1000, 1000, 19, true, 600, 6)
  }

  static generatePositiveDecisionLowRiskLoanDto(): LoanDto {
    return new LoanDto(20000, 0, 30, true, 500, 12)
  }

  static generatePositiveDecisionHighRiskLoanDto(): LoanDto {
    return new LoanDto(15000, 2500, 55, true, 300, 3)
  }

  static generateNegativeDecisionVeryHighRiskLoanDto(): LoanDto {
    return new LoanDto(7000, 7500, 80, true, 4000, 18)
  }

  static generateNegativeDecisionYongCustomerLoanDto(): LoanDto {
    return new LoanDto(100, 100, 13, false, 1000, 36)
  }

  static generateEmptyLoanDto(): Object {
    return {}
  }

  static serializeResponse(json: any): ResponseLoan {
    return new ResponseLoan(
      json.riskScore,
      json.riskLevel,
      json.riskPeriods,
      json.applicationId,
      json.riskDecision,
    )
  }
}
