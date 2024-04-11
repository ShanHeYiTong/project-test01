import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from 'express';
import { AuthService } from "./auth.service";
import { Public } from "../global/decorator/public.decorator";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

}
