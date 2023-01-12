import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infrastructure/interceptors/response.interceptor';

const fileLogFormat = winston.format.combine(winston.format.timestamp(), winston.format.simple());

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('APP', { prettyPrint: true })
          )
        }),
        new WinstonDailyRotateFile({
          level: 'error',
          filename: 'logs/error/error-%DATE%.log',
          maxFiles: 30,
          zippedArchive: true,
          format: fileLogFormat
        }),
        new WinstonDailyRotateFile({
          level: 'debug',
          filename: 'logs/all/all-%DATE%.log',
          maxFiles: 14,
          zippedArchive: true,
          format: fileLogFormat
        })
      ]
    })
  });
  app.set('trust proxy', 1);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cubeez')
    .setDescription('큐비즈 API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  const config = app.get<ConfigService>(ConfigService);
  const corsHost = JSON.stringify(config.get<string>('CORS_HOST', '[]'));
  app.enableCors({
    credentials: true,
    origin: corsHost,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD']
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(8080);
}

bootstrap();
