import { Injectable } from '@nestjs/common';

@Injectable()
export class Md5Service {
  private readonly A0 = 0x67452301;
  private readonly B0 = 0xefcdab89;
  private readonly C0 = 0x98badcfe;
  private readonly D0 = 0x10325476;

  private readonly S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
    9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
    16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21,
  ];

  private readonly K = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ]);

  private readonly PADDING = new Uint8Array([
    0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
  ]);

  public async md5(input: Buffer): Promise<string> {
    const hashBuffer = this.generateMd5Hash(input);
    return this.bufferToHex(hashBuffer);
  }

  public async verifyFileIntegrity(
    file: Buffer,
    expectedHash: string,
  ): Promise<boolean> {
    const computedHash = await this.md5(file);
    return computedHash === expectedHash.toLowerCase();
  }

  private generateMd5Hash(input: Buffer): ArrayBuffer {
    let A = this.A0;
    let B = this.B0;
    let C = this.C0;
    let D = this.D0;

    const size = input.length;
    const paddingLength =
      size % 64 < 56 ? 56 - (size % 64) : 56 + 64 - (size % 64);
    const inputBytes = new Uint8Array(size + paddingLength + 8);

    inputBytes.set(new Uint8Array(input), 0);

    for (let i = 0; i < paddingLength; ++i) {
      inputBytes[size + i] = this.PADDING[i];
    }

    const sizeBitsLower = (size * 8) >>> 0;
    const sizeBitsUpper = ((size * 8) / Math.pow(2, 32)) >>> 0;

    inputBytes[size + paddingLength + 0] = (sizeBitsLower >>> 0) & 0xff;
    inputBytes[size + paddingLength + 1] = (sizeBitsLower >>> 8) & 0xff;
    inputBytes[size + paddingLength + 2] = (sizeBitsLower >>> 16) & 0xff;
    inputBytes[size + paddingLength + 3] = (sizeBitsLower >>> 24) & 0xff;
    inputBytes[size + paddingLength + 4] = (sizeBitsUpper >>> 0) & 0xff;
    inputBytes[size + paddingLength + 5] = (sizeBitsUpper >>> 8) & 0xff;
    inputBytes[size + paddingLength + 6] = (sizeBitsUpper >>> 16) & 0xff;
    inputBytes[size + paddingLength + 7] = (sizeBitsUpper >>> 24) & 0xff;

    for (let i = 0; i < (size + paddingLength) / 64; ++i) {
      const m = this.getChunk(i, inputBytes);

      let AA = A;
      let BB = B;
      let CC = C;
      let DD = D;

      let E;
      let g;

      for (let j = 0; j < 64; ++j) {
        switch (Math.floor(j / 16)) {
          case 0:
            E = this.F(BB, CC, DD);
            g = j;
            break;
          case 1:
            E = this.G(BB, CC, DD);
            g = (j * 5 + 1) % 16;
            break;
          case 2:
            E = this.H(BB, CC, DD);
            g = (j * 3 + 5) % 16;
            break;
          default:
            E = this.I(BB, CC, DD);
            g = (j * 7) % 16;
            break;
        }

        const temp = DD;
        DD = CC;
        CC = BB;
        BB = this.unsigned32Add(
          BB,
          this.rotateLeft(
            this.unsigned32Add(AA, E, this.K[j], m[g]),
            this.S[j],
          ),
        );
        AA = temp;
      }

      A = this.unsigned32Add(A, AA);
      B = this.unsigned32Add(B, BB);
      C = this.unsigned32Add(C, CC);
      D = this.unsigned32Add(D, DD);
    }

    const resultBuffer = new ArrayBuffer(16);
    const resultView = new Uint8Array(resultBuffer);
    const result = new Uint32Array(resultBuffer);

    result[0] = A;
    result[1] = B;
    result[2] = C;
    result[3] = D;

    return resultBuffer;
  }

  private getChunk(i: number, inputBytes: Uint8Array): Uint32Array {
    const m = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      m[j] =
        (inputBytes[i * 64 + j * 4] << 0) |
        (inputBytes[i * 64 + j * 4 + 1] << 8) |
        (inputBytes[i * 64 + j * 4 + 2] << 16) |
        (inputBytes[i * 64 + j * 4 + 3] << 24);
    }

    return m;
  }

  private rotateLeft(value: number, shift: number): number {
    return ((value << shift) | (value >>> (32 - shift))) >>> 0;
  }

  private unsigned32Add(...args: number[]): number {
    return args.reduce((sum, val) => (sum + val) >>> 0, 0);
  }

  private F(x: number, y: number, z: number): number {
    return (x & y) | (~x & z);
  }

  private G(x: number, y: number, z: number): number {
    return (x & z) | (y & ~z);
  }

  private H(x: number, y: number, z: number): number {
    return x ^ y ^ z;
  }

  private I(x: number, y: number, z: number): number {
    return y ^ (x | ~z);
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const hexParts: string[] = [];
    for (let i = 0; i < byteArray.length; ++i) {
      const hex = byteArray[i].toString(16).padStart(2, '0');
      hexParts.push(hex);
    }
    return hexParts.join('');
  }
}
