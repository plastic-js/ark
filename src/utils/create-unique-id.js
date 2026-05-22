let uniqueId = 0

export const createUniqueId = (prefix = 'ark')=> {
	uniqueId += 1
	return `${prefix}-${uniqueId}`
}
