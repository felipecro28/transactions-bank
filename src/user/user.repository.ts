import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    const { document, email, full_name, kind, password } = data;
    const user = await this.prismaService
      .$executeRaw`INSERT INTO Users (document, email, full_name, kind, password) VALUES (${document}, ${email}, ${full_name}, ${kind}, ${password})`;

    return user;
  }
}
