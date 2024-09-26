import { Test, TestingModule } from '@nestjs/testing';
import { Md5Service } from './md5.service';

describe('Md5Service', () => {
  let service: Md5Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Md5Service],
    }).compile();

    service = module.get<Md5Service>(Md5Service);
  });

  it('should return correct hash for empty string', async () => {
    const input = Buffer.from('');
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('D41D8CD98F00B204E9800998ECF8427E');
  });

  it('should return correct hash for "a"', async () => {
    const input = Buffer.from('a');
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('0CC175B9C0F1B6A831C399E269772661');
  });

  it('should return correct hash for "abc"', async () => {
    const input = Buffer.from('abc');
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('900150983CD24FB0D6963F7D28E17F72');
  });

  it('should return correct hash for "message digest"', async () => {
    const input = Buffer.from('message digest');
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('F96B697D7CB7938D525A2F31AAF161D0');
  });

  it('should return correct hash for "abcdefghijklmnopqrstuvwxyz"', async () => {
    const input = Buffer.from('abcdefghijklmnopqrstuvwxyz');
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('C3FCD3D76192E4007DFB496CCA67E13B');
  });

  it('should return correct hash for "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"', async () => {
    const input = Buffer.from(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    );
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('D174AB98D277D9F5A5611C2C9F419D9F');
  });

  it('should return correct hash for long string of numbers', async () => {
    const input = Buffer.from(
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
    );
    const hash = await service.md5(input);
    expect(hash.toUpperCase()).toBe('57EDF4A22BE3C955AC49DA2E2107B67A');
  });
});
