export class Custom {
  static today: string = new Date().toISOString()

  static createdAt = (): Date => new Date(this.today)

  static updatedAt = (): Date => new Date(this.today)
}
