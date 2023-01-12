import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-apple';
import { Cache } from 'cache-manager';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'APPLE') {
  constructor(
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    super({
      clientID: config.get('APPLE_CLIENT_ID', ''),
      teamID: config.get('APPLE_TEAM_ID', ''),
      keyID: config.get('APPLE_KEY_ID', ''),
      privateKeyString: config.get('APPLE_PRIVATE_KEY', ''),
      callbackURL: '/auth/social/apple/callback'
    });
  }

  async validate(_: string, __: string, profile: Profile): Promise<string | boolean> {
    // TODO: 애플 로그인 구현
    return true;
  }
}
