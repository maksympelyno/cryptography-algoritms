import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { CreatePsevdoNumbersDto } from './dto/createPsevdo.dto';
import { GeneratorResponseInterface } from './types/generatorResponse.interface';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async generate(
    @Body() createPsevdoNumbersDto: CreatePsevdoNumbersDto,
  ): Promise<GeneratorResponseInterface> {
    return this.generatorService.generateNumbers(createPsevdoNumbersDto);
  }

  @Get('download/:fileName')
  @Header('Content-Type', 'application/octet-stream')
  @Header('Content-Disposition', 'attachment; filename="downloaded.txt"')
  async downloadFile(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    const fileBuffer = await this.generatorService.downloadFile(fileName);
    return new StreamableFile(fileBuffer);
  }
}
