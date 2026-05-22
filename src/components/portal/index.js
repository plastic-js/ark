import { Portal as RuntimePortal } from '../../runtime.js'
import { useEnvironmentContext } from '../../providers/environment/index.js'

export const Portal = ({ container, children })=> {
	const env = useEnvironmentContext()
	const resolvedContainer = container ?? (()=> env.getDocument().body)
	return RuntimePortal({ container: resolvedContainer, children })
}
