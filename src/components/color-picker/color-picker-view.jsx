import { Either, False, True } from '../../runtime.js'
import { createSplitProps } from '../../utils/index.js'
import { useColorPickerContext } from './color-picker-context.js'

const splitViewProps = createSplitProps(['format', 'children'])

export const ColorPickerView = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [localProps] = splitViewProps(props)
	return (
		<Either condition={()=> colorPicker().format === localProps.format}>
			<True>
				{localProps.children}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}
