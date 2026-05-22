import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from '../field/index.js'
import { ratingGroupAnatomy } from './rating-group.anatomy.js'
import { useRatingGroupContext } from './rating-group-context.js'

const anatomy = ratingGroupAnatomy.build()

const getFieldDescribedBy = (field)=> {
	if (!field){
		return undefined
	}

	if (typeof field.ariaDescribedby === 'function'){
		return field.ariaDescribedby()
	}

	if (typeof field.describedBy === 'function'){
		return field.describedBy()
	}

	return field.ariaDescribedby
}

export const RatingGroupHiddenInput = (props = {})=> {
	const ratingGroup = useRatingGroupContext()
	const field = useFieldContext()
	const mergedProps = mergeProps(()=> ratingGroup().getHiddenInputProps(), {
		...anatomy.hiddenInput.attrs,
		defaultValue: undefined,
		value: ()=> String(ratingGroup().value ?? ''),
		'aria-describedby': getFieldDescribedBy(field),
		...props,
	})
	return ark.input(mergedProps)
}
