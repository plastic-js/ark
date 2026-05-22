import { createContext } from '../../utils/index.js'

const [RatingGroupProvider, useRatingGroupContext] = createContext({
	strict: false,
	hookName: 'useRatingGroupContext',
	providerName: '<RatingGroupProvider />',
	defaultValue: null,
})

const [RatingGroupItemProvider, useRatingGroupItemContext] = createContext({
	strict: false,
	hookName: 'useRatingGroupItemContext',
	providerName: '<RatingGroupItemProvider />',
	defaultValue: null,
})

const [RatingGroupItemPropsProvider, useRatingGroupItemPropsContext] = createContext({
	strict: false,
	hookName: 'useRatingGroupItemPropsContext',
	providerName: '<RatingGroupItem />',
	defaultValue: null,
})

export {
	RatingGroupItemProvider,
	RatingGroupItemPropsProvider,
	RatingGroupProvider,
	useRatingGroupContext,
	useRatingGroupItemContext,
	useRatingGroupItemPropsContext,
}
