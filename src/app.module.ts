import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from "./global/guard/jwt-auth.guard";
import envConfig from "../config/envConfig";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'project-test01',
    //   synchronize: false,
    //   retryDelay: 500,
    //   retryAttempts: 10,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: configService.get<number>('DB_PORT') ?? 3306,
        username: configService.get<string>('DB_USERNAME') ?? 'root',
        password: configService.get<string>('DB_PASSWORD') ?? 'root',
        database: configService.get<string>('DB_DATABASE') ?? 'project-test01',
        synchronize: true,
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    ListModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,  //注册这个 Guard
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
