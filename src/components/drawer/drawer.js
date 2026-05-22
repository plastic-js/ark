import { DrawerBackdrop } from './drawer-backdrop.jsx'
import { DrawerCloseTrigger } from './drawer-close-trigger.jsx'
import { DrawerContent } from './drawer-content.jsx'
import { DrawerDescription } from './drawer-description.jsx'
import { DrawerGrabber } from './drawer-grabber.jsx'
import { DrawerGrabberIndicator } from './drawer-grabber-indicator.jsx'
import { DrawerIndent } from './drawer-indent.jsx'
import { DrawerIndentBackground } from './drawer-indent-background.jsx'
import { DrawerPositioner } from './drawer-positioner.jsx'
import { DrawerRoot } from './drawer-root.jsx'
import { DrawerSwipeArea } from './drawer-swipe-area.jsx'
import { DrawerTitle } from './drawer-title.jsx'
import { DrawerTrigger } from './drawer-trigger.jsx'

const drawerParts = {
	Root: DrawerRoot,
	Trigger: DrawerTrigger,
	Backdrop: DrawerBackdrop,
	Positioner: DrawerPositioner,
	Content: DrawerContent,
	Title: DrawerTitle,
	Description: DrawerDescription,
	CloseTrigger: DrawerCloseTrigger,
	Grabber: DrawerGrabber,
	GrabberIndicator: DrawerGrabberIndicator,
	Indent: DrawerIndent,
	IndentBackground: DrawerIndentBackground,
	SwipeArea: DrawerSwipeArea,
}

export const Drawer = Object.assign(DrawerRoot, drawerParts)
export {
	DrawerBackdrop as Backdrop,
	DrawerCloseTrigger as CloseTrigger,
	DrawerContent as Content,
	DrawerDescription as Description,
	DrawerGrabber as Grabber,
	DrawerGrabberIndicator as GrabberIndicator,
	DrawerIndent as Indent,
	DrawerIndentBackground as IndentBackground,
	DrawerPositioner as Positioner,
	DrawerRoot as Root,
	DrawerSwipeArea as SwipeArea,
	DrawerTitle as Title,
	DrawerTrigger as Trigger,
}
