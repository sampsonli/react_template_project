// eslint-disable-next-line
type Result<K> = (...args) => Promise<{data: K['sample']}>
// eslint-disable-next-line
export function generator<T>(Apis: T): {[p in keyof T]: Result<T[p]>}
