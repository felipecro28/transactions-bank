import { Body, Controller, Post, Response } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/")
  async create(@Body() body: CreateUserDTO, @Response() res) {
    const user = await this.userService.create(body);
    return res.status(201).json(user);
  }
}
