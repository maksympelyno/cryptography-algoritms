import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Md5Service } from './md5.service';
import { memoryStorage } from 'multer';

@Controller('md5')
export class Md5Controller {
  constructor(private readonly md5Service: Md5Service) {}

  @Get('hash')
  public async hashString(@Query('input') input: string): Promise<string> {
    const inputBuffer = Buffer.from(input, 'utf-8');
    const hashBuffer = this.md5Service.md5(inputBuffer);

    return hashBuffer;
  }

  @Post('file-hash')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  public async hashFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Файл не надано');
    }
    const fileContent = file.buffer;

    return this.md5Service.md5(fileContent);
  }

  @Post('verify-file')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  public async verifyFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('expectedHash') expectedHash: string,
  ): Promise<boolean> {
    const fileContent = file.buffer;
    return this.md5Service.verifyFileIntegrity(fileContent, expectedHash);
  }
}
