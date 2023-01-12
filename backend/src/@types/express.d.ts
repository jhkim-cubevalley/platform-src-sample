import JwtDecodeType from '../infrastructure/common/types/jwt-decode-type';

declare global {
  namespace Express {
    interface Request {
      decode: JwtDecodeType;
    }
  }
}
