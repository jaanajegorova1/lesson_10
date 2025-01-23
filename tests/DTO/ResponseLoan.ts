export class ResponseLoan {
  riskScore: number;
  riskLevel: string;
  riskPeriods: number;
  applicationId: string;
  riskDecision: string;

  constructor(
    riskScore: number,
    riskLevel: string,
    riskPeriods: number,
    applicationId: string,
    riskDecision: string,
  ) {
    this.riskScore = riskScore
    this.riskLevel = riskLevel
    this.riskPeriods = riskPeriods
    this.applicationId = applicationId
    this.riskDecision = riskDecision
  }
}
