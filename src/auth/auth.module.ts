import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TodosModule } from 'src/todos/todos.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TodosModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
