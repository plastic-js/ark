import { StepsCompletedContent } from './steps-completed-content.jsx'
import { StepsContent } from './steps-content.jsx'
import { StepsIndicator } from './steps-indicator.jsx'
import { StepsItem } from './steps-item.jsx'
import { StepsList } from './steps-list.jsx'
import { StepsNextTrigger } from './steps-next-trigger.jsx'
import { StepsPrevTrigger } from './steps-prev-trigger.jsx'
import { StepsProgress } from './steps-progress.jsx'
import { StepsRoot } from './steps-root.jsx'
import { StepsSeparator } from './steps-separator.jsx'
import { StepsTrigger } from './steps-trigger.jsx'

const stepsParts = {
	Root: StepsRoot,
	List: StepsList,
	Item: StepsItem,
	Trigger: StepsTrigger,
	Content: StepsContent,
	Indicator: StepsIndicator,
	Separator: StepsSeparator,
	NextTrigger: StepsNextTrigger,
	PrevTrigger: StepsPrevTrigger,
	Progress: StepsProgress,
	CompletedContent: StepsCompletedContent,
}

export const Steps = Object.assign(StepsRoot, stepsParts)
export {
	StepsCompletedContent as CompletedContent,
	StepsContent as Content,
	StepsIndicator as Indicator,
	StepsItem as Item,
	StepsList as List,
	StepsNextTrigger as NextTrigger,
	StepsPrevTrigger as PrevTrigger,
	StepsProgress as Progress,
	StepsRoot as Root,
	StepsSeparator as Separator,
	StepsTrigger as Trigger,
}
