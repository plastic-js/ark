import { DialogBackdrop } from './dialog-backdrop.jsx'
import { DialogCloseTrigger } from './dialog-close-trigger.jsx'
import { DialogContent } from './dialog-content.jsx'
import { DialogDescription } from './dialog-description.jsx'
import { DialogPositioner } from './dialog-positioner.jsx'
import { DialogRoot } from './dialog-root.jsx'
import { DialogTitle } from './dialog-title.jsx'
import { DialogTrigger } from './dialog-trigger.jsx'

const dialogParts = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Backdrop: DialogBackdrop,
	Positioner: DialogPositioner,
	Content: DialogContent,
	Title: DialogTitle,
	Description: DialogDescription,
	CloseTrigger: DialogCloseTrigger,
}

export const Dialog = Object.assign(DialogRoot, dialogParts)
export {
	DialogBackdrop as Backdrop,
	DialogCloseTrigger as CloseTrigger,
	DialogContent as Content,
	DialogDescription as Description,
	DialogPositioner as Positioner,
	DialogRoot as Root,
	DialogTitle as Title,
	DialogTrigger as Trigger,
}
