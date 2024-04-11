import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from "../auth/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  providers: [UserService,AuthService,JwtService],
  controllers: [UserController],
  imports: [ TypeOrmModule.forFeature([User]),
            JwtModule, // Import JwtModule
  ],
})
export class UserModule {}
