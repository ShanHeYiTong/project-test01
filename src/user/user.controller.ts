import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { CreateListDto } from "../list/dto/create-list.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateListDto } from "../list/dto/update-list.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('user') //指定标签
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {}

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

  //增
  @Post('create')
  async createApi(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  //单查
  @Get(':id')
  async findOneeApi(@Param('id') id: number) {
    return this.userService.findOnee(id)
  }

  //分查
  @Get()
  @ApiQuery({ name: 'page', type: Number, required: true, description: '页码' })
  @ApiQuery({ name: 'size', type: Number, required: true, description: '每页数量' })
  async findAllApi(@Query('page') page: number, @Query('size') size: number) {
    return this.userService.findAll({page, size})
  }

  //修改
  @Patch(':id')
  updateApi(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //删除
  @Delete(':id')
  removeApi(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
