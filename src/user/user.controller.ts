import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('user') //指定标签
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
