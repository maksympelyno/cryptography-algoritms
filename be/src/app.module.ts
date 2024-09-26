import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorModule } from './generator/generator.module';
import { Md5Module } from './md5/md5.module';

@Module({
  imports: [GeneratorModule, Md5Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
