import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { jwtConstants } from "./constants";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";

@Module({
  //导入用户模块
  imports: [
    UserModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService,UserService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
