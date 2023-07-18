import { Injectable } from '@nestjs/common';

import { PrismaClient } from './generated';

@Injectable()
export class PrismaService extends PrismaClient {}
