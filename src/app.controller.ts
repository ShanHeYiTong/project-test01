import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('app') //指定标签
@Controller('api/chinese')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
  //定义swagger输入内容
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          example: '今天天气不错',
        },
      },
    },
  })
  @Post('s2t')
 async s2t(@Body('text') text: string): Promise<any> {
    return await this.appService.s2tt(text);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          example: '今天天氣不錯',
        },
      },
    },
  })
  @Post('t2s')
  async t2s(@Body('text') text: string): Promise<any> {
    return await this.appService.t2s(text);
  }
}
