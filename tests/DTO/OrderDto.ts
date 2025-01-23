export class OrderDto {
  status: string | undefined
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    status: string | undefined,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  static generateRandomOrderDto(): OrderDto {
    return new OrderDto(
      'OPEN',
      +Math.floor(Math.random()), //123, //nekije randomnyje dannyje
      'David',
      '+4852345235',
      'no comment',
      +Math.floor(Math.random()), //1234
    )
  }

  static generateOrderDtoWithoutStatus(): OrderDto {
    return new OrderDto(
      undefined, //sozdajom zakaz bez polja status , vovse bez etogo polja
      +Math.floor(Math.random()), //123, //nekije randomnyje dannyje, floor eto 0 ili 1, a Math.random eto ot 1 do 11.
      'David',
      '+4852345235', //Faker.getRandomName()  //dlja generacii randomnyh chisel
      'no comment',
      +Math.floor(Math.random()), //1234
    )
  }

  static generateEmptyOrderDto(): any { //Object
    // vmesto Object mozhet byt' any, hotja eto i ne horosho tak propisyvat
    return {}
  }

  static serializeResponse(json: any): OrderDto {
    // vmesto Object mozhet byt' any, hotja eto i ne horosho tak propisyvat. Na vhode u nas json, a na vyhode nekij OrderDto
    return new OrderDto(
      json.status,
      json.courierId,
      json.customerName,
      json.customerPhone,
      json.comment,
      json.id,
    )
  }
}
