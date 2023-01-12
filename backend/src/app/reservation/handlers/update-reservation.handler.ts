import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Reservation, ReservationStatus } from '../domain/reservation.entity';
import { ReservationPeople } from '../domain/reservation-people.entity';
import { Error } from '../../../infrastructure/common/error';
import { Passport } from '../domain/passport.entity';
import { UpdateReservationCommand } from '../commands/update-reservation.command';
import { GetReservationQuery } from '../queries/get-reservation.query';
import { encryptString } from '../../../infrastructure/common/util';
import { SendEmailCommand } from '../../email/send-email.command';
import { SendSmsCommand } from '../../sms/send-sms.command';

@Injectable()
@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler implements ICommandHandler<UpdateReservationCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    private readonly config: ConfigService,
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationPeople) private readonly reservationPeopleRepository: Repository<ReservationPeople>,
    @InjectRepository(Passport) private readonly passportRepository: Repository<Passport>
  ) {}

  private async sendEmailAndSns(reservation: Reservation, status: ReservationStatus): Promise<void> {
    const productName = reservation.event.product.name;
    const startDateString = new Date(reservation.event.startDate).toLocaleDateString();
    switch (status) {
      case 'not_after':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 예약 확정',
            body: `[${productName}]${startDateString}의 여행 예약이 확정 되었습니다. 예약금에 대한 안내를 곧 드릴 예정이니 기다려 주세요!`
          })
        );
        break;
      case 'not_before':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 선금 납부 완료',
            body: `[${productName}]${startDateString}의 여행 예약의 선금 납부가 완료 되었습니다. 곧 좋은 여행 상품으로 만나 뵙겠습니다.`
          })
        );
        break;
      case 'payment':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 결제 완료',
            body: `[${productName}]${startDateString}의 여행의 결제를 완료 하였습니다. 저희 큐비즈에서 제공하는 여행에 참여해 주셔서 감사합니다.`
          })
        );
        break;
      case 'done':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 여행 완료',
            body: `[${productName}]${startDateString}의 여행은 잘 다녀오셨을까요? ‘고객명’의 현재 마음 그대로 소중한 ‘후기’를 남겨주세요!`
          })
        );
        break;
      case 'request_cancel':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 취소 요청',
            body: `[${productName}]${startDateString}의 여행을 ‘취소’ 요청 하셨습니다. 담당 관리자가 곧 응대 해드릴 예정이니 조금만 기다려주세요!`
          })
        );
        break;
      case 'doing_cancel':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 취소 요청 접수',
            body: `[${productName}]${startDateString}의 여행의 예약 취소 요청 건이 접수 되었습니다. 담당 관리자가 곧 응대 해드릴 예정이니 조금만 기다려주세요!`
          })
        );
        break;
      case 'done_cancel':
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [reservation.bookerEmail],
            subject: '[CUBEEZ] 여행상품 취소 완료',
            body: `[${productName}]${startDateString}의 여행이 취소 완료 되었습니다. 아쉽지만 다음에 좋은 기회로 다시 만나길 기다리겠습니다. 감사합니다.`
          })
        );
        break;
      default:
    }
    await this.commandBus.execute(
      new SendSmsCommand({
        to: [reservation.bookerPhone],
        content: '[CUBEEZ] 예약하신 여행의 상태가 변경 되었으니 확인 바랍니다. http://test.cubeez.kr'
      })
    );
  }

  async execute({ id, data }: UpdateReservationCommand): Promise<boolean> {
    const { people, ...input } = data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reservation = await this.queryBus.execute<unknown, Reservation>(new GetReservationQuery(id));
      if (!reservation) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);

      await queryRunner.manager.update(Reservation, id, input);

      if (people) {
        await queryRunner.manager.delete(ReservationPeople, { reservation: { id } });
        await Promise.all(
          reservation.reservationPeoples.map(async ({ passport }) => {
            await queryRunner.manager.delete(Passport, { id: passport.id });
          })
        );
        await Promise.all(
          people.map(async ({ passport, rnnSecond, ...person }) => {
            const reservationPeople = this.reservationPeopleRepository.create({
              ...person,
              reservation,
              rnnSecond: rnnSecond ? encryptString(rnnSecond, this.config.get('PRIVACY_KEY')) : null
            });
            await queryRunner.manager.save(reservationPeople);

            if (passport) {
              if (Number.isNaN(+passport.birthday) || Number.isNaN(+passport.passportExpire)) {
                throw new BadRequestException(Error.INVALID_BODY);
              }

              const passportEntity = this.passportRepository.create({
                ...passport,
                reservationPeople,
                passportNumber: encryptString(passport.passportNumber, this.config.get('PRIVACY_KEY'))
              });
              await queryRunner.manager.save(passportEntity);
            }
          })
        );
      }
      await queryRunner.commitTransaction();
      if (data.status && reservation.status !== data.status) await this.sendEmailAndSns(reservation, data.status);
      Logger.log({ message: '예약 정보를 수정했습니다.', id: reservation.id, code: reservation.code });
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
