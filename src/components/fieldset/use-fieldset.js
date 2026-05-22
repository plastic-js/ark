import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { fieldsetAnatomy } from './fieldset.anatomy.js'
import { FieldsetErrorText } from './fieldset-error-text.jsx'
import { FieldsetHelperText } from './fieldset-helper-text.jsx'
import { FieldsetLegend } from './fieldset-legend.jsx'

const splitFieldsetProps = createSplitProps([
	'id',
	'disabled',
	'invalid',
	'rootRef',
	'asChild',
	'children',
])

const visitFieldsetChildren = (node, visitor)=> {
	if (Array.isArray(node)){
		node.forEach(child=> visitFieldsetChildren(child, visitor))
		return
	}

	if (node == null || typeof node !== 'object'){
		return
	}

	visitor(node)
	visitFieldsetChildren(node.children, visitor)
}

export const useFieldset = (props = {})=> {
	const [localProps, elementProps] = splitFieldsetProps(props)
	const anatomy = fieldsetAnatomy.build()
	const baseId = localProps.id ?? createUniqueId('fieldset')
	const refs = {
		root: { current: null },
	}
	const nodes = {
		legend: null,
		helperText: null,
		errorText: null,
	}

	const ids = {
		root: `${baseId}--root`,
		legend: `${baseId}--legend`,
		helperText: `${baseId}--helper-text`,
		errorText: `${baseId}--error-text`,
	}

	visitFieldsetChildren(localProps.children, (node)=> {
		if (!('tag' in node)){
			return
		}

		if (node.tag === FieldsetLegend){
			nodes.legend = true
			return
		}

		if (node.tag === FieldsetHelperText){
			nodes.helperText = true
			return
		}

		if (node.tag === FieldsetErrorText){
			nodes.errorText = true
		}
	})

	const describedBy = ()=> {
		const idsToJoin = []
		if (localProps.invalid && nodes.errorText){
			idsToJoin.push(ids.errorText)
		}
		if (nodes.helperText){
			idsToJoin.push(ids.helperText)
		}
		return idsToJoin.join(' ') || undefined
	}

	return {
		ids,
		disabled: ()=> Boolean(localProps.disabled),
		invalid: ()=> Boolean(localProps.invalid),
		describedBy,
		getRootProps: ()=> ({
			...elementProps,
			id: ids.root,
			ref: mergeRefs(elementProps.ref, localProps.rootRef, (value)=> {
				refs.root.current = value
			}),
			asChild: localProps.asChild,
			disabled: ()=> Boolean(localProps.disabled),
			'aria-labelledby': ids.legend,
			'aria-describedby': describedBy,
			'data-disabled': ()=> dataAttr(localProps.disabled),
			'data-invalid': ()=> dataAttr(localProps.invalid),
			...anatomy.root.attrs,
			children: localProps.children,
		}),
		getLegendProps: (props = {})=> mergeProps({
			id: ids.legend,
			ref: mergeRefs(props.ref),
			'data-disabled': ()=> dataAttr(localProps.disabled),
			'data-invalid': ()=> dataAttr(localProps.invalid),
			...anatomy.legend.attrs,
		}, props),
		getHelperTextProps: (props = {})=> mergeProps({
			id: ids.helperText,
			ref: mergeRefs(props.ref),
			...anatomy.helperText.attrs,
		}, props),
		getErrorTextProps: (props = {})=> mergeProps({
			id: ids.errorText,
			ref: mergeRefs(props.ref),
			'aria-live': 'polite',
			...anatomy.errorText.attrs,
		}, props),
	}
}
