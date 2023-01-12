import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3, SES } from 'aws-sdk';
import { AuthModule } from './app/auth/auth.module';
import { AccountModule } from './app/account/account.module';
import { UserModule } from './app/user/user.module';
import { User } from './app/user/domain/user.entity';
import { Cubeez } from './app/cubeez/domain/cubeez.entity';
import { Admin } from './app/admin/domain/admin.entity';
import { AccountSns } from './app/account/domain/account-sns.entity';
import { Group } from './app/account/domain/group.entity';
import { CubeezDocument } from './app/cubeez/domain/cubeez-document.entity';
import { CubeezPhone } from './app/cubeez/domain/cubeez-phone.entity';
import { CubeezModule } from './app/cubeez/cubeez.module';
import { AdminModule } from './app/admin/admin.module';
import { Role } from './app/account/domain/role.entity';
import { RolePolicy } from './app/account/domain/role-policy.entity';
import { Department } from './app/admin/domain/department.entity';
import { Team } from './app/admin/domain/team.entity';
import { JobPosition } from './app/admin/domain/job-position.entity';
import { NotificationModule } from './app/notification/notification.module';
import { EmailModule } from './app/email/email.module';
import { Inquiry } from './app/inquiry/domain/inquiry.entity';
import { InquiryModule } from './app/inquiry/inquiry.module';
import { NoticeBoardModule } from './app/board/notice/notice-board.module';
import { NoticeBoard } from './app/board/notice/domain/notice-board.entity';
import { LibraryModule } from './app/library/library.module';
import { Library } from './app/library/domain/library.entity';
import { LibraryDetail } from './app/library/domain/library-detail.entity';
import { LibraryImage } from './app/library/domain/library-image.entity';
import { Region } from './app/product/domain/region/region.entity';
import { ProductModule } from './app/product/product.module';
import { HomeModule } from './app/home/home.module';
import { Menu } from './app/home/domain/menu/menu.entity';
import { Product } from './app/product/domain/product/product.entity';
import { ProductImage } from './app/product/domain/product/product-image.entity';
import { ProductFlight } from './app/product/domain/product/product-flight.entity';
import { ProductPlan } from './app/product/domain/product/product-plan.entity';
import { ProductPlanDetail } from './app/product/domain/product/product-plan-detail.entity';
import { ProductNote } from './app/product/domain/product/product-note.entity';
import { ProductRegion } from './app/product/domain/product/product-region.entity';
import { ProductCategory } from './app/product/domain/product/product-category.entity';
import { ProductHistory } from './app/product/domain/product/product-history.entity';
import { HistoryModule } from './app/history/history.module';
import { HomeContent } from './app/home/domain/home-content.entity';
import { Tos } from './app/tos/domain/tos.entity';
import { TosModule } from './app/tos/tos.module';
import { Incentive } from './app/product/domain/incentive/incentive.entity';
import { ProductTos } from './app/product/domain/product/product-tos.entity';
import { Badge } from './app/product/domain/badge/badge.entity';
import { AppController } from './app.controller';
import { ContentImage } from './app/board/upload/domain/content-image.entity';
import { CronModule } from './infrastructure/cron/cron.module';
import { ProductApprove } from './app/product/domain/product/product-approve.entity';
import { Event } from './app/event/domain/event.entity';
import { EventMemo } from './app/event/domain/event-memo.entity';
import { EventEditFile } from './app/event/domain/event-edit-file.entity';
import { EventFlight } from './app/event/domain/event-flight.entity';
import { EventPlan } from './app/event/domain/event-plan.entity';
import { EventPlanDetail } from './app/event/domain/event-plan-detail.entity';
import { EventHistory } from './app/event/domain/event-history.entity';
import { UploadModule } from './app/board/upload/upload.module';
import { EventModule } from './app/event/event.module';
import { PromotionModule } from './app/promotion/promotion.module';
import { Promotion } from './app/promotion/domain/promotion.entity';
import { PromotionProduct } from './app/promotion/domain/promotion-product.entity';
import { EventType } from './app/event/domain/event-type.entity';
import { ReservationModule } from './app/reservation/reservation.module';
import { Reservation } from './app/reservation/domain/reservation.entity';
import { ReservationPeople } from './app/reservation/domain/reservation-people.entity';
import { Passport } from './app/reservation/domain/passport.entity';
import { ApiLoggerMiddleware } from './infrastructure/middlewares/api-logger.middleware';
import { Contract } from './app/product/domain/contract/contract.entity';
import { ContractTos } from './app/product/domain/contract/contract-tos.entity';
import { ReviewModule } from './app/review/review.module';
import { Review } from './app/review/domain/review.entity';
import { ReviewFile } from './app/review/domain/review-file.entity';
import { PromotionViewcount } from './app/promotion/domain/promotion-viewcount.entity';
import { PromotionStat } from './app/promotion/domain/promotion-stat.entity';
import { ProductViewcount } from './app/product/domain/product/product-viewcount.entity';
import { PaymentModule } from './app/payment/payment.module';
import { InquiryFile } from './app/inquiry/domain/inquiry-file.entity';
import { PartnerModule } from './app/partner/partner.module';
import { Partner } from './app/partner/domain/partner.entity';
import { PartnerCommission } from './app/partner/domain/partner-commission.entity';
import { PartnerDocument } from './app/partner/domain/partner-document.entity';
import { PartnerMemo } from './app/partner/domain/partner-memo.entity';
import { PartnerGroup } from './app/partner/domain/partner-group.entity';
import { Popup } from './app/home/domain/popup/popup.entity';
import { SettlementModule } from './app/settlement/settlement.module';
import { PartnerSettlement } from './app/settlement/domain/partner-settlement.entity';
import { PointModule } from './app/point/point.module';
import { PointConfig } from './app/point/domain/point-config.entity';
import { PointTransaction } from './app/point/domain/point-transaction.entity';
import { FreeBoard } from './app/board/free/domain/free-board.entity';
import { FreeBoardReply } from './app/board/free/domain/free-board-reply.entity';
import { FreeBoardViewcount } from './app/board/free/domain/free-board-viewcount.entity';
import { FreeBoardModule } from './app/board/free/free-board.module';
import { CouponModule } from './app/coupon/coupon.module';
import { Coupon } from './app/coupon/domain/coupon.entity';
import { CouponCode } from './app/coupon/domain/coupon-code.entity';
import { CouponTransaction } from './app/coupon/domain/coupon-transaction.entity';
import { ServerConfigModule } from './app/serverConfig/server-config.module';
import { ServerConfig } from './app/serverConfig/domain/server-config.entity';
import { SmsModule } from './app/sms/sms.module';

const entities = [
  User,
  Cubeez,
  CubeezDocument,
  CubeezPhone,
  Admin,
  AccountSns,
  Group,
  Role,
  RolePolicy,
  Department,
  Team,
  JobPosition,
  Inquiry,
  InquiryFile,
  NoticeBoard,
  Library,
  LibraryDetail,
  LibraryImage,
  Region,
  Menu,
  Product,
  ProductImage,
  ProductFlight,
  ProductPlan,
  ProductPlanDetail,
  ProductNote,
  ProductRegion,
  ProductCategory,
  ProductHistory,
  ProductTos,
  ProductApprove,
  ProductViewcount,
  HomeContent,
  Tos,
  Incentive,
  Badge,
  ContentImage,
  Event,
  EventType,
  EventMemo,
  EventEditFile,
  EventFlight,
  EventPlan,
  EventPlanDetail,
  EventHistory,
  Promotion,
  PromotionProduct,
  PromotionViewcount,
  PromotionStat,
  Reservation,
  ReservationPeople,
  Passport,
  Contract,
  ContractTos,
  Review,
  ReviewFile,
  Partner,
  PartnerCommission,
  PartnerDocument,
  PartnerMemo,
  PartnerGroup,
  Popup,
  PartnerSettlement,
  PointConfig,
  PointTransaction,
  FreeBoard,
  FreeBoardReply,
  FreeBoardViewcount,
  Coupon,
  CouponCode,
  CouponTransaction,
  ServerConfig
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 3306),
        username: config.get<string>('DATABASE_USERNAME', 'username'),
        password: config.get<string>('DATABASE_PASSWORD', 'password'),
        database: config.get<string>('DATABASE_DBNAME', 'main'),
        entities,
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy()
      })
    }),
    CacheModule.register({ isGlobal: true }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
          region: config.get('AWS_REGION')
        })
      },
      services: [SES, S3]
    }),
    CronModule,
    ServerConfigModule,
    NotificationModule,
    EmailModule,
    SmsModule,
    AuthModule,
    AccountModule,
    UserModule,
    CubeezModule,
    AdminModule,
    UploadModule,
    HomeModule,
    NoticeBoardModule,
    HistoryModule,
    InquiryModule,
    LibraryModule,
    ProductModule,
    TosModule,
    EventModule,
    PromotionModule,
    ReservationModule,
    ReviewModule,
    PaymentModule,
    PartnerModule,
    SettlementModule,
    PointModule,
    FreeBoardModule,
    CouponModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiLoggerMiddleware).exclude('/health').forRoutes('*');
  }
}
