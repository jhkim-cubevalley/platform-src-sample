import { ServerConfigKey } from '../domain/server-config.entity';

export const DEFAULT_SERVER_CONFIG_VALUE: Record<ServerConfigKey, string> = {
  AFTER_PRICE_RATE: '30',
  BEFORE_PRICE_RATE: '70'
};
