import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from "class-validator";

export enum UserType {
  Shopkeeper = "shopkeeper",
  Regular = "regular",
}

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  full_name: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(14)
  document: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  kind: UserType;
}
