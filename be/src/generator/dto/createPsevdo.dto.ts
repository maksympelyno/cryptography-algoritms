import { IsNotEmpty, Min } from 'class-validator';

export class CreatePsevdoNumbersDto {
  @IsNotEmpty()
  @Min(0.01, { message: 'Модуль (m) повинен бути не менше 0.' })
  m: number;

  @IsNotEmpty()
  a: number;

  @IsNotEmpty()
  c: number;

  @IsNotEmpty()
  x0: number;

  @IsNotEmpty()
  @Min(1, { message: 'Кількість чисел (count) повинна бути більше 0.' })
  count: number;
}
