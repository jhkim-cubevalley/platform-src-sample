import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('상태 체크')
@Controller('')
export class AppController {
  @ApiOperation({
    description: '서버 상태 체크 API'
  })
  @Get('health')
  healthCheck(): boolean {
    return true;
  }
}
