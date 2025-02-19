## Post Loan DTO Tests

| #   | DTO Load test names                                             | Should receive code | Received code | Status |
| --- | --------------------------------------------------------------- | ------------------- | ------------- | ------ |
| 1   | Negative decision to receive loan                               | 200                 | 200           | Passed |
| 2   | Successful decision of loan with correct data and Medium Risk   | 200                 | 200           | Passed |
| 3   | Successful decision of loan with correct data and Low Risk      | 200                 | 200           | Passed |
| 4   | Positive decision of loan with correct data and High Risk       | 200                 | 200           | Passed |
| 5   | Negative decision of loan with correct data and Very High Risk  | 200                 | 200           | Passed |
| 6   | Negative decision of loan for young customer and Very High Risk | 200                 | 200           | Passed |
| 7   | Empty loan dto                                                  | 400                 | 400           | Passed |
