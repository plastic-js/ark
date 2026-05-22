import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { radioGroupAnatomy } from './radio-group.anatomy.js'
import { useRadioGroupItemContext } from './radio-group-context.js'

export const RadioGroupIndicator = (props = {})=> {
	const itemState = useRadioGroupItemContext()
	const anatomy = radioGroupAnatomy.build()
	return ark.span(mergeProps({
		...anatomy.indicator.attrs,
		hidden: ()=> !itemState().checked,
		'data-state': ()=> itemState().checked ? 'checked' : 'unchecked',
		'data-disabled': ()=> itemState().disabled ? '' : undefined,
		'data-invalid': ()=> itemState().invalid ? '' : undefined,
		'data-focus': ()=> itemState().focused ? '' : undefined,
		'data-focus-visible': ()=> itemState().focusVisible ? '' : undefined,
		'data-hover': ()=> itemState().hovered ? '' : undefined,
		'data-active': ()=> itemState().active ? '' : undefined,
	}, props))
}
