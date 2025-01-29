export class LoginDTO {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectData(): LoginDTO {
    return new LoginDTO(process.env.USERNAME || '', process.env.PASSWORD || '')
  }
}
