import { Injectable } from '@nestjs/common';
var chineseConv = require('chinese-conv');
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

 async s2tt(text: string): Promise<any> {
   // 调用库提供的简体转繁体方法
    return {
     code:200,
     data:chineseConv.tify(text)
   }
  }

  async t2s(text: string): Promise<any> {
    // 调用库提供的繁体转简体方法
    return {
      code:200,
      data:chineseConv.sify(text)
    }
  }
}
