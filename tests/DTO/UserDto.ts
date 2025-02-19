export class UserDto {
  id: number
  name: string
  email: string
  phone: string

  constructor(id: number, name: string, email: string, phone: string) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
  }

  static serializeResponse(json: any): UserDto {
    return new UserDto(json?.id, json?.name, json?.email, json?.phone)
  }
}
