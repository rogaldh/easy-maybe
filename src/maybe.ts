import type { Maybe } from "../@types/easy-maybe/maybe.d";
import { JustImpl, MaybeType, NothingImpl } from './common';

const andMap = <A, B>(f: (arg0: A) => B, m: Maybe<A>): Maybe<B> => {
  switch (m.type) {
    case MaybeType.Just:
      return JustImpl(f(m.value));
    case MaybeType.Nothing:
    default:
      return NothingImpl();
  }
};

const tap = <T>(f: (arg0: T) => void, m: Maybe<T>): Maybe<T> => {
  switch (m.type) {
    case MaybeType.Just: {
      f(m.value);
      return m;
    }
    case MaybeType.Nothing:
    default:
      return NothingImpl();
  }
};

const andThen = <A, B>(f: (arg0: A) => Maybe<B>, m: Maybe<A>): Maybe<B> => {
  switch (m.type) {
    case MaybeType.Just:
      return f(m.value);
    case MaybeType.Nothing:
    default:
      return NothingImpl();
  }
};

const consume = <A, B>(f: (arg0: A) => B, m: Maybe<A>): B | undefined => {
  switch (m.type) {
    case MaybeType.Just:
      return f(m.value);
    case MaybeType.Nothing:
    default:
      return undefined;
  }
};

const of = <T>(value?: T): Maybe<T> => {
  if (value === undefined) return NothingImpl();
  if (value === null) return NothingImpl();

  const val = value!;

  return JustImpl(val);
};

const unwrap = <T>(m: Maybe<T>): T | undefined => {
  switch (m.type) {
     case MaybeType.Just:
      return m.value;
    case MaybeType.Nothing:
    default:
      return undefined;
  }
}

const withDefault = <T>(defaultValue: T, m: Maybe<T>): T => {
  switch (m.type) {
    case MaybeType.Just:
      return m.value;
    case MaybeType.Nothing:
    default:
      return defaultValue;
  }
};

const MaybeImpl = {
  andMap,
  andThen,
  consume,
  of,
  tap,
  unwrap,
  withDefault,
};

export default MaybeImpl;
