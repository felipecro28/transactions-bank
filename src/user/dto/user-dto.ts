import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";

export class UserDTO extends CreateUserDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
