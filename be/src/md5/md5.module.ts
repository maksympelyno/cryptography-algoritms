import { Module } from '@nestjs/common';
import { Md5Controller } from './md5.controller';
import { Md5Service } from './md5.service';

@Module({
  controllers: [Md5Controller],
  providers: [Md5Service]
})
export class Md5Module {}
