import { TourActionTrigger } from './tour-action-trigger.jsx'
import { TourArrow } from './tour-arrow.jsx'
import { TourArrowTip } from './tour-arrow-tip.jsx'
import { TourBackdrop } from './tour-backdrop.jsx'
import { TourCloseTrigger } from './tour-close-trigger.jsx'
import { TourContent } from './tour-content.jsx'
import { TourControl } from './tour-control.jsx'
import { TourDescription } from './tour-description.jsx'
import { TourNextTrigger } from './tour-next-trigger.jsx'
import { TourPositioner } from './tour-positioner.jsx'
import { TourPrevTrigger } from './tour-prev-trigger.jsx'
import { TourProgressText } from './tour-progress-text.jsx'
import { TourRoot } from './tour-root.jsx'
import { TourSpotlight } from './tour-spotlight.jsx'
import { TourTitle } from './tour-title.jsx'
import { TourTrigger } from './tour-trigger.jsx'

const tourParts = {
	Root: TourRoot,
	Trigger: TourTrigger,
	Backdrop: TourBackdrop,
	Spotlight: TourSpotlight,
	Positioner: TourPositioner,
	Content: TourContent,
	Control: TourControl,
	Title: TourTitle,
	Description: TourDescription,
	CloseTrigger: TourCloseTrigger,
	PrevTrigger: TourPrevTrigger,
	NextTrigger: TourNextTrigger,
	ActionTrigger: TourActionTrigger,
	ProgressText: TourProgressText,
	Arrow: TourArrow,
	ArrowTip: TourArrowTip,
}

export const Tour = Object.assign(TourRoot, tourParts)
export {
	TourActionTrigger as ActionTrigger,
	TourArrow as Arrow,
	TourArrowTip as ArrowTip,
	TourBackdrop as Backdrop,
	TourCloseTrigger as CloseTrigger,
	TourContent as Content,
	TourControl as Control,
	TourDescription as Description,
	TourNextTrigger as NextTrigger,
	TourPositioner as Positioner,
	TourPrevTrigger as PrevTrigger,
	TourProgressText as ProgressText,
	TourRoot as Root,
	TourSpotlight as Spotlight,
	TourTitle as Title,
	TourTrigger as Trigger,
}
