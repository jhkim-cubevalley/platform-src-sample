import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DecodeTokenCommand } from '../commands/decode-token.command';
import JwtDecodeType from '../../../infrastructure/common/types/jwt-decode-type';

@Injectable()
@CommandHandler(DecodeTokenCommand)
export class DecodeTokenHandler implements ICommandHandler<DecodeTokenCommand> {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  async execute(command: DecodeTokenCommand): Promise<JwtDecodeType> {
    const tokenDecode = this.jwtService.verify<JwtDecodeType>(command.token, {
      secret: command.isRefresh ? this.config.get('JWT_REFRESH_SECRET_KEY') : this.config.get('JWT_SECRET_KEY')
    });
    return tokenDecode;
  }
}
