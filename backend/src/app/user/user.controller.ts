import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, NotFoundException, Put, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { User } from './domain/user.entity';
import { Error } from '../../infrastructure/common/error';
import { SetSnsCommand } from '../account/commands/set-sns.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';
import { UpdateUserDto } from './domain/update-user.dto';

@ApiTags('user - 고객 관련 API')
@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '자기 자신의 고객 회원정보 수정'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Put('/')
  async updateMe(@Req() req, @Body() body: UpdateUserDto): Promise<boolean> {
    const { sns, ...input } = body;
    const user = await this.queryBus.execute<unknown, User>(new GetUserByEmailQuery(req.decode.email));
    if (!user) throw new NotFoundException(Error.NOT_FOUND_USER);

    await this.commandBus.execute(
      new SetSnsCommand({
        user: user.uid,
        cubeez: null,
        sns
      })
    );
    return this.commandBus.execute(
      new UpdateUserCommand(user.uid, {
        ...input
      })
    );
  }
}
