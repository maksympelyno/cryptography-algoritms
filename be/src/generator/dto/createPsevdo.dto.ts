import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreatePsevdoNumbersDto {
  @IsNotEmpty({ message: 'Модуль (m) не може бути порожнім.' })
  @IsInt({ message: 'Модуль (m) повинен бути цілим числом.' })
  @Min(1, { message: 'Модуль (m) повинен бути більше 0.' })
  m: number;

  @IsNotEmpty({ message: 'Коефіцієнт (a) не може бути порожнім.' })
  @IsInt({ message: 'Коефіцієнт (a) повинен бути цілим числом.' })
  @Min(1, { message: 'a повинен бути більше 0.' })
  a: number;

  @IsNotEmpty({ message: 'Константа (c) не може бути порожньою.' })
  @IsInt({ message: 'Константа (c) повинна бути цілим числом.' })
  @Min(0, { message: 'c повинно бути не менше 0.' })
  c: number;

  @IsNotEmpty({ message: 'Початкове значення (x0) не може бути порожнім.' })
  @IsInt({ message: 'Початкове значення (x0) повинно бути цілим числом.' })
  @Min(0, { message: 'Початкове значення (x0) повинно бути не менше 0.' })
  x0: number;

  @IsNotEmpty({ message: 'Кількість чисел (count) не може бути порожньою.' })
  @IsInt({ message: 'Кількість чисел (count) повинна бути цілим числом.' })
  @Min(1, { message: 'Кількість чисел (count) повинна бути більше 0.' })
  count: number;
}
