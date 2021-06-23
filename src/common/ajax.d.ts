type Result = (...args) => Promise<{data: any, message: string, ok: boolean, code: number}>
// eslint-disable-next-line
export function generator<T>(Apis: T): {[p in keyof T]: Result}
