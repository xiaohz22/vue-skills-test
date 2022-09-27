type Record<K extends keyof any, T> = { [P in K]: T; };
type ToPartial<T> = { [Key in keyof T]-?: T[Key] };   // -? => required
type ToNReadOnly<T> = { -readonly [Key in keyof T]?: T[Key] };  // -readonly => not readonly

export type Partial = ToPartial<{ name: string, age: number }>;
export type NReadOnly = ToNReadOnly<{ name: string, age: number }>


export type IRecordS = Record<string, any>;
