import {
	createContext as createRuntimeContext,
	useContext as useRuntimeContext,
} from '../runtime.js'

const getErrorMessage = (hookName, providerName)=> `${hookName} returned \`undefined\`. Seems you forgot to wrap component within ${providerName}`

export const createContext = (options = {})=> {
	const {
		strict = true,
		hookName = 'useContext',
		providerName = 'Provider',
		errorMessage,
		defaultValue,
	} = options

	const Context = createRuntimeContext(defaultValue)

	const useContext = ()=> {
		const context = useRuntimeContext(Context)

		if (context === undefined && strict){
			const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName))
			error.name = 'ContextError'
			if (typeof Error.captureStackTrace === 'function'){
				Error.captureStackTrace(error, useContext)
			}
			throw error
		}

		return context
	}

	return [Context.Provider, useContext, Context]
}
