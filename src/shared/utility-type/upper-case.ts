export type UpperCase<T extends string> = T extends `${infer First}` ? Uppercase<First> : never;
