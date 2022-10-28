import type { Just, Nothing } from "../@types/easy-maybe/maybe.d";

export enum MaybeType {
  Just = 'maybe-just',
  Nothing = 'maybe-nothing',
}

export const plunge = <T = any>(a: T): T => a;

export const NothingImpl = (): Nothing => ({
  type: MaybeType.Nothing,
});

export const JustImpl = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value: value as Exclude<T, undefined | null>,
});
