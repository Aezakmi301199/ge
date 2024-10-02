export type Deep<T> = {
  [K in keyof T]: T[K] extends object ? Deep<T[K]> : T[K];
};
