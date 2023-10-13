import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      const isPasswordMatching = await bcrypt.compare(
        password,
        user?.password || '',
      );
      if (!isPasswordMatching || !user) {
        throw new HttpException(
          "L'email ou le mot de passe ne correspond pas.",
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async login(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
      payload,
    };
  }

  public async register(data: CreateUserDto) {
    const response = await this.userService.create(data);

    return response;
  }

  decodeToken(token) {
    return this.jwtTokenService.decode(token);
  }
}
