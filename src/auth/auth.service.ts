import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { TodosService } from 'src/todos/todos.service';

@Injectable()
export class AuthService {
  constructor(
    private todoService: TodosService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto) {
    const { password } = registerDto;
    const hashedPassword = await hash(password, 10);
    const payload = { ...registerDto, password: hashedPassword };
    const createdUser = await this.todoService.create(payload);
    return createdUser;
  }

  async login(loginDto) {
    const { email, password } = loginDto;
    const user = await this.todoService.findOne({ email: email });
    if (!user) throw new HttpException('NOT FOUND', 404);

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new HttpException('INVALID PASSWORD', 403);

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
