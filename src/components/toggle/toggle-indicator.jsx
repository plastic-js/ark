import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToggleContext } from './toggle-context.js'

export const ToggleIndicator = (props = {})=> {
	const toggleApi = useToggleContext()
	return ark.div(mergeProps(()=> ({
		...toggleApi().getIndicatorProps(),
		hidden: !toggleApi().pressed,
	}), props))
}
