export declare interface Just<T> {
  type: 'maybe-just';
  value: Exclude<T, undefined | null>;
}

export declare interface Nothing {
  type: 'maybe-nothing';
}

export declare type Maybe<T> = Just<T> | Nothing;
