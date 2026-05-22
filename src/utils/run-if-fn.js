export const runIfFn = (valueOrFn, ...args)=> typeof valueOrFn === 'function' ? valueOrFn(...args) : valueOrFn
