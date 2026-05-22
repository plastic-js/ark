import { Either, False, True } from '../../runtime.js'
import { ark } from '../factory.js'
import { usePresence } from './use-presence.js'

export const PresenceRoot = (props = {})=> {
	const presence = usePresence(props)

	return (
		<Either condition={()=> presence().present}>
			<True>
				{ark.div(presence().getRootProps())}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}
