import type { Maybe } from "../@types/easy-maybe/maybe.d";
import MaybeImpl from './maybe';
import { JustImpl, NothingImpl, MaybeType, plunge } from './common';

const as = <A, B>(f: (arg0: Maybe<A>) => Maybe<B>, m: Maybe<A>): Maybe<B> => {
  switch (m.type) {
    case MaybeType.Just: {
      return f(m);
    }
    case MaybeType.Nothing:
    default:
      return NothingImpl();
  }
};

const fork = <T>(m: Maybe<T>): T | undefined => {
  switch (m.type) {
    case MaybeType.Just: {
      return m.value;
    }
    case MaybeType.Nothing:
    default:
      return undefined;
  }
};

const forkJust = <T>(m: Maybe<T>): T => {
  switch (m.type) {
    case MaybeType.Just: {
      return m.value;
    }
    case MaybeType.Nothing:
    default:
      throw new Error('Nothing')
  }
};

const isJust = <T>(m: Maybe<T>): boolean => m.type === MaybeType.Just;

const isNothing = <T>(m: Maybe<T>): boolean => m.type === MaybeType.Nothing;

const combine = <A>(m: Array<Maybe<A>>): Maybe<Array<A>> => {
  const list: Array<A> = [];
  let isNoth = false;

  m.forEach((mb) => {
    if (isNoth) return;
    const res = MaybeImpl.consume<A, A>((x) => x, mb);

    if (!res) isNoth = true;
    else list.push(res);
  });

  if (!isNoth) return JustImpl(list);
  return NothingImpl();
};

const combine2 = <A, B>(m: [Maybe<A>, Maybe<B>]): Maybe<[A, B]> => {
  const list: [any, any] = [undefined, undefined];
  const [a, b] = m;

  if (isNothing(a) || isNothing(b)) return NothingImpl();

  list[0] = MaybeImpl.consume(plunge, a);
  list[1] = MaybeImpl.consume(plunge, b);

  return JustImpl<[A, B]>(list);
};

const combine3 = <A, B, C>(m: [Maybe<A>, Maybe<B>, Maybe<C>]): Maybe<[A, B, C]> => {
  const list: [any, any, any] = [undefined, undefined, undefined];
  const [a, b, c] = m;

  if (isNothing(a) || isNothing(b) || isNothing(c)) return NothingImpl();

  list[0] = MaybeImpl.consume(plunge, a);
  list[1] = MaybeImpl.consume(plunge, b);
  list[2] = MaybeImpl.consume(plunge, c);

  return JustImpl<[A, B, C]>(list);
};

export const Extra = {
  as,
  combine,
  combine2,
  combine3,
  fork,
  forkJust,
  isJust,
  isNothing,
};
