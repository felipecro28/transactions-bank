import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    try {
      const user = await this.userRepository.create(data);
      if (!user.id) {
        throw new HttpException(
          "Erro ao criar o usuário",
          HttpStatus.BAD_REQUEST
        );
      }

      return user;
    } catch (error) {
      if (error.message.includes("already exists")) {
        throw new HttpException(
          "Usuário já existente: Já existe um usuário cadastrado com o e-mail/documento informado.",
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        `Ocorreu um erro: ${error.message}`,
        error.status
      );
    }
  }

  async find(id: string) {
    try {
      const user = await this.userRepository.findUnique(+id);
      if (!user) {
        throw new HttpException(
          "Não existe um usuário associado ao ID",
          HttpStatus.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}
