import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    const { document, email, full_name, kind, password } = data;
    const user: { id: number } = await this.prismaService
      .$queryRaw`INSERT INTO "User" (document, email, full_name, kind , password) VALUES (${document}, ${email}, ${full_name}, ${kind}::"UserType", ${password}) RETURNING id`;

    return user[0];
  }

  async findUnique(id: number): Promise<User | null> {
    const user: User | null = await this.prismaService
      .$queryRaw`SELECT document, email, full_name, kind, password FROM "User" WHERE id = ${id}`;

    return user[0];
  }
}
