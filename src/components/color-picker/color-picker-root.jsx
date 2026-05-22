import * as colorPicker from '@zag-js/color-picker'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ColorPickerProvider } from './color-picker-context.js'
import { useColorPicker } from './use-color-picker.js'

const splitColorPickerProps = createSplitProps(colorPicker.props)

export const ColorPickerRoot = (props = {})=> {
	const [machineProps, elementProps] = splitColorPickerProps(props)
	const api = useColorPicker(machineProps)
	return ColorPickerProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}
