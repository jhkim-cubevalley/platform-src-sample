import { IQuery } from '@nestjs/cqrs';
import DocumentType from '../../../infrastructure/common/types/document-type';

export class GetCubeezDocumentQuery implements IQuery {
  constructor(readonly uid: string, readonly type: DocumentType) {}
}
