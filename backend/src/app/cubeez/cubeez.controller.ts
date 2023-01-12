import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ConflictException, Controller, NotFoundException, Put, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { UpdateCubeezDto } from './domain/update-cubeez.dto';
import { Cubeez } from './domain/cubeez.entity';
import { Error } from '../../infrastructure/common/error';
import { GetCubeezByPhoneQuery } from './queries/get-cubeez-by-phone.query';
import { GetCubeezByNicknameQuery } from './queries/get-cubeez-by-nickname.query';
import { SetCubeezPhoneCommand } from './commands/set-cubeez-phone.command';
import { SetSnsCommand } from '../account/commands/set-sns.command';
import { UpdateCubeezCommand } from './commands/update-cubeez.command';
import { GetCubeezByEmailQuery } from './queries/get-cubeez-by-email.query';

@ApiTags('cubeez - 큐비즈 관련 API')
@Controller('cubeez')
export class CubeezController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '자기 자신의 큐비즈 회원정보 수정 (서류 변경은 별도 API 이용)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Put('/')
  async updateMe(@Req() req, @Body() body: UpdateCubeezDto): Promise<boolean> {
    const { phones, sns, ...input } = body;
    const cubeez = await this.queryBus.execute<unknown, Cubeez>(new GetCubeezByEmailQuery(req.decode.email));
    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);

    await Promise.all(
      phones.map(async (phone) => {
        const existsPhone = await this.queryBus.execute(new GetCubeezByPhoneQuery(phone));
        if (existsPhone && cubeez.uid !== existsPhone.uid) throw new ConflictException(Error.PHONE_ALREADY_EXISTS);
      })
    );

    const existsNickname = await this.queryBus.execute(new GetCubeezByNicknameQuery(body.nickname));
    if (body.nickname && existsNickname && cubeez.uid !== existsNickname.uid) {
      throw new ConflictException(Error.NICKNAME_ALREADY_EXISTS);
    }

    await this.commandBus.execute(new SetCubeezPhoneCommand({ cubeez: cubeez.uid, phones }));
    await this.commandBus.execute(
      new SetSnsCommand({
        user: null,
        cubeez: cubeez.uid,
        sns
      })
    );
    return this.commandBus.execute(
      new UpdateCubeezCommand(cubeez.uid, {
        ...input,
        nickname: cubeez.isBusiness ? undefined : body.nickname
      })
    );
  }
}
