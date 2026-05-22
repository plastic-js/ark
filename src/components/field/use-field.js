import {
	ariaAttr,
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useFieldsetContext } from '../fieldset/index.js'
import { fieldAnatomy } from './field.anatomy.js'
import { FieldErrorText } from './field-error-text.jsx'
import { FieldHelperText } from './field-helper-text.jsx'
import { FieldLabel } from './field-label.jsx'

const splitFieldProps = createSplitProps([
	'id',
	'ids',
	'required',
	'disabled',
	'invalid',
	'readOnly',
	'rootRef',
	'asChild',
	'children',
])

const visitFieldChildren = (node, visitor)=> {
	if (Array.isArray(node)){
		node.forEach(child=> visitFieldChildren(child, visitor))
		return
	}

	if (node == null || typeof node !== 'object'){
		return
	}

	visitor(node)
	visitFieldChildren(node.children, visitor)
}

export const useField = (props = {})=> {
	const [localProps, elementProps] = splitFieldProps(props)
	const fieldset = useFieldsetContext()
	const anatomy = fieldAnatomy.build()
	const baseId = localProps.id ?? createUniqueId('field')
	const refs = {
		root: { current: null },
	}
	const nodes = {
		label: null,
		helperText: null,
		errorText: null,
	}

	const ids = {
		root: localProps.ids?.root ?? `${baseId}--root`,
		control: localProps.ids?.control ?? `${baseId}--control`,
		label: localProps.ids?.label ?? `${baseId}--label`,
		helperText: localProps.ids?.helperText ?? `${baseId}--helper-text`,
		errorText: localProps.ids?.errorText ?? `${baseId}--error-text`,
	}

	const disabled = ()=> Boolean(localProps.disabled ?? fieldset?.disabled?.())
	const invalid = ()=> Boolean(localProps.invalid ?? fieldset?.invalid?.())
	const readOnly = ()=> Boolean(localProps.readOnly)
	const required = ()=> Boolean(localProps.required)

	visitFieldChildren(localProps.children, (node)=> {
		if (!('tag' in node)){
			return
		}

		if (node.tag === FieldLabel){
			nodes.label = true
			return
		}

		if (node.tag === FieldHelperText){
			nodes.helperText = true
			return
		}

		if (node.tag === FieldErrorText){
			nodes.errorText = true
		}
	})

	const describedBy = ()=> {
		const idsToJoin = []
		if (invalid() && nodes.errorText){
			idsToJoin.push(ids.errorText)
		}
		if (nodes.helperText){
			idsToJoin.push(ids.helperText)
		}
		return idsToJoin.join(' ') || undefined
	}

	const getControlProps = (props = {})=> mergeProps({
		id: ids.control,
		'aria-labelledby': ()=> nodes.label ? ids.label : undefined,
		'aria-describedby': describedBy,
		'aria-invalid': ()=> ariaAttr(invalid()),
		'data-invalid': ()=> dataAttr(invalid()),
		'data-required': ()=> dataAttr(required()),
		'data-readonly': ()=> dataAttr(readOnly()),
		disabled,
		readOnly: ()=> readOnly() || undefined,
		required,
	}, props)

	return {
		ids,
		disabled,
		invalid,
		readOnly,
		required,
		describedBy,
		getRootProps: ()=> ({
			...elementProps,
			id: ids.root,
			role: 'group',
			ref: mergeRefs(elementProps.ref, localProps.rootRef, (value)=> {
				refs.root.current = value
			}),
			asChild: localProps.asChild,
			'data-disabled': ()=> dataAttr(disabled()),
			'data-invalid': ()=> dataAttr(invalid()),
			'data-readonly': ()=> dataAttr(readOnly()),
			...anatomy.root.attrs,
			children: localProps.children,
		}),
		getLabelProps: (props = {})=> mergeProps({
			id: ids.label,
			ref: mergeRefs(props.ref),
			htmlFor: ids.control,
			'data-disabled': ()=> dataAttr(disabled()),
			'data-invalid': ()=> dataAttr(invalid()),
			'data-readonly': ()=> dataAttr(readOnly()),
			'data-required': ()=> dataAttr(required()),
			...anatomy.label.attrs,
		}, props),
		getInputProps: (props = {})=> ({
			...getControlProps(props),
			...anatomy.input.attrs,
		}),
		getTextareaProps: (props = {})=> ({
			...getControlProps(props),
			...anatomy.textarea.attrs,
		}),
		getSelectProps: (props = {})=> ({
			...getControlProps(props),
			...anatomy.select.attrs,
		}),
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
		getRequiredIndicatorProps: (props = {})=> mergeProps({
			'aria-hidden': true,
			...anatomy.requiredIndicator.attrs,
		}, props),
	}
}
