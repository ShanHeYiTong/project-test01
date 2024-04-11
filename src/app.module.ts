import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'project-test01',
      synchronize: false,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
    UserModule,
    ListModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
