export declare function run<T, Obj, Key extends keyof Obj>(obj: Obj & {
    [key: string]: () => T;
}, key: Key): T;
export declare type Behavior<Pos extends string, Out> = Record<Pos, () => Out>;
