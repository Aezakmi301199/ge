export type LowerCase<T extends string> = T extends `${infer First}` ? Lowercase<First> : never;
