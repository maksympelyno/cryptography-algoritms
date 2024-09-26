import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePsevdoNumbersDto } from './dto/createPsevdo.dto';
import { GeneratorResponseInterface } from './types/generatorResponse.interface';
import { createHash } from 'crypto';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class GeneratorService {
  async generateNumbers(
    params: CreatePsevdoNumbersDto,
  ): Promise<GeneratorResponseInterface> {
    const { m, a, c, x0, count } = params;

    let x = BigInt(x0);
    const bigM = BigInt(m);
    const bigA = BigInt(a);
    const bigC = BigInt(c);
    const results: bigint[] = [];

    const period = this.findPeriod(x, bigA, bigC, bigM);

    for (let i = 0; i < count; i++) {
      x = (bigA * x + bigC) % bigM;
      results.push(x);
    }

    const fileName = await this.saveResultsToFile(results);

    return {
      uniqueNumbers: results.map(Number).slice(0, 1000000),
      period,
      fileName,
    };
  }

  async downloadFile(fileName: string): Promise<Buffer> {
    const filePath = path.join(__dirname, '..', 'files', fileName);

    try {
      return await fs.readFile(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }
  }

  private findPeriod(x0: bigint, a: bigint, c: bigint, m: bigint): number {
    let x = x0;

    x = (a * x + c) % m;
    const firstNumber = x;
    let step = 1;

    while (true) {
      x = (a * x + c) % m;
      if (x === firstNumber) {
        return step;
      }
      step++;
    }
  }

  private async saveResultsToFile(numbers: bigint[]): Promise<string> {
    const fileName = `numbers_result.txt`;
    const filePath = path.join(__dirname, '..', 'files', fileName);
    const fileContent = numbers?.map((num) => num.toString()).join('\n');

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(filePath, fileContent, 'utf-8');

    return fileName;
  }
}
