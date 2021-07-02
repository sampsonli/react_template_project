type Result = (...args) => Promise<{data: any, errmsg: string, errno: number, logId: string}>
// eslint-disable-next-line
export function generator<T>(Apis: T): {[p in keyof T]: Result}
