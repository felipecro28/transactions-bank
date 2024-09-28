import { Body, Controller, Post, Response, Param, Get } from "@nestjs/common";
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

  @Get("/:id")
  async find(@Param("id") id: string, @Response() res) {
    const user = await this.userService.find(id);
    return res.status(200).json(user);
  }
}
