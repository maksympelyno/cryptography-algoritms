export interface GeneratorParams {
  m: number;
  a: number;
  c: number;
  x0: number;
  count: number;
}

export interface GeneratorResponse {
  uniqueNumbers: number[];
  period: number;
  fileName: string;
}
