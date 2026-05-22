# @plastic-js/zag

Zag.js framework adapter for the [Plastic](https://github.com/zzzgit/jsx) JSX runtime.

The Plastic counterpart to [`@zag-js/solid`](https://www.npmjs.com/package/@zag-js/solid), [`@zag-js/react`](https://www.npmjs.com/package/@zag-js/react), and [`@zag-js/vue`](https://www.npmjs.com/package/@zag-js/vue).

## Install

```sh
npm install @plastic-js/zag
```

Peer dependencies: `@plastic-js/plastic`, `alien-signals`.

## Exports

- `machine` — bind a zag-js state machine to Plastic's reactivity.
- `mergeProps` — zag-style prop merging (reverse-order event chaining, `class`/`style` concatenation).
- `normalizeProps` — DOM prop normalizer for zag-js machines.
- `createComputed` — Plastic-flavored computed.
- `useSyncExternalStore` — external-store subscription primitive.
