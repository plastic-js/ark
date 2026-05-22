import * as colorPicker from '@zag-js/color-picker'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const stringifyColor = (color)=> {
	const alpha = color.getChannelValue('alpha')
	if (alpha < 1){
		return color.toString('css').toLowerCase()
	}
	return color.toString('hex').toLowerCase()
}

export const useColorPicker = (props = {})=> {
	const id = createUniqueId('color-picker')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(colorPicker.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		value: access(props.value) != null ? colorPicker.parse(access(props.value)) : undefined,
		defaultValue: access(props.defaultValue) != null ? colorPicker.parse(access(props.defaultValue)) : undefined,
		onValueChange: details=> props.onValueChange?.(stringifyColor(details.value)),
		onFormatChange: details=> props.onFormatChange?.(details.format),
		onOpenChange: details=> props.onOpenChange?.(details.open),
	}))

	return createComputed(()=> colorPicker.connect(service, normalizeProps))
}
