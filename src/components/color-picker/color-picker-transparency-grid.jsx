import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

const splitTransparencyGridProps = createSplitProps(['size'])

export const ColorPickerTransparencyGrid = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [gridProps, elementProps] = splitTransparencyGridProps(props)
	return ark.div(mergeProps(()=> colorPicker().getTransparencyGridProps(gridProps), elementProps))
}
