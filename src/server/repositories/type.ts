import prisma from "@/server/prisma";

/**
 * Repository class for handling pokemon type data.
 */
export class TypeRepository {
  static instance = new TypeRepository();
  private constructor() {}

  /**
   * Retrieves all unique pokemon types.
   *
   * @returns - A list of all pokemon types.
   */
  async getAll() {
    return (
      await prisma.type.findMany({
        select: { name: true },
        distinct: "name",
      })
    ).map((t) => t.name);
  }
}
