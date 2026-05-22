import { Loop } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSignaturePadContext } from './signature-pad-context.js'

const splitSizeProps = (props)=> {
	const {
		width, height, ...rest
	} = props
	const sizeStyle = {}
	if (width != null){ sizeStyle.width = typeof width === 'number' ? `${width}px` : width }
	if (height != null){ sizeStyle.height = typeof height === 'number' ? `${height}px` : height }
	return [sizeStyle, rest]
}

export const SignaturePadCanvas = (props = {})=> {
	const signaturePad = useSignaturePadContext()
	const [sizeStyle, restProps] = splitSizeProps(props)
	const controlProps = mergeProps(signaturePad().getControlProps(), { style: sizeStyle }, restProps)
	return ark.div({
		...controlProps,
		children: ark.svg({
			...signaturePad().getSegmentProps(),
			children: [
				Loop({
					each: ()=> signaturePad().paths,
					children: path=> ark.path(signaturePad().getSegmentPathProps({ path })),
				}),
				()=> {
					const current = signaturePad().currentPath
					return current ? ark.path(signaturePad().getSegmentPathProps({ path: current })) : null
				},
			],
		}),
	})
}
