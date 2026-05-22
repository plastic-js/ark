import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDateInputContext } from './date-input-context.js'

export const DateInputInput = (props = {})=> {
	const dateInput = useDateInputContext()
	const getCurrentSegments = ()=> dateInput().getSegments()
	const segments = getCurrentSegments().map((segment, index)=> ark.span({
		...dateInput().getSegmentProps({ segment }),
		children: ()=> {
			dateInput.version()
			return getCurrentSegments()[index]?.text ?? segment.text
		},
	}))
	const segmentGroup = ark.div({
		...dateInput().getSegmentGroupProps(),
		children: segments,
	})
	return [
		ark.input(dateInput().getHiddenInputProps()),
		ark.div(mergeProps(dateInput().getControlProps(), props, {
			children: segmentGroup,
		})),
	]
}
