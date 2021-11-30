export class Custom {
  public static createdAt = (): string => new Date().toISOString()

  public static updatedAt = (): string => new Date().toISOString()
}
