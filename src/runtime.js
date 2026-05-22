// Development shim: points at the parent repository's JSX runtime source.
// When @ark-ui/plastic is published as a standalone package, replace this
// with the real runtime package name (e.g. `plastic-runtime`).
export * from '@plastic-js/plastic'
export {
	h, appendChildren, applyProps, createOwner, disposeOwner, materializeNode, renderApp,
} from '@plastic-js/plastic/jsx-runtime'
