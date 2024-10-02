export type RequiredByKeys<T, K extends keyof T = keyof T, O = Omit<T, K> & { [P in K]-?: T[P] }> = {
  [P in keyof O]: O[P];
};
