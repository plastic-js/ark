import { ToastActionTrigger } from './toast-action-trigger.jsx'
import { ToastCloseTrigger } from './toast-close-trigger.jsx'
import { ToastDescription } from './toast-description.jsx'
import { ToastRoot } from './toast-root.jsx'
import { ToastTitle } from './toast-title.jsx'
import { ToastTrigger } from './toast-trigger.jsx'
import { ToastViewport } from './toast-viewport.jsx'
import { Toaster as ToasterComponent } from './toaster.jsx'

const toastParts = {
	Root: ToastRoot,
	Trigger: ToastTrigger,
	Viewport: ToastViewport,
	Title: ToastTitle,
	Description: ToastDescription,
	CloseTrigger: ToastCloseTrigger,
	ActionTrigger: ToastActionTrigger,
	Toaster: ToasterComponent,
}

export const Toast = Object.assign(ToastRoot, toastParts)
export {
	ToastActionTrigger as ActionTrigger,
	ToastCloseTrigger as CloseTrigger,
	ToastDescription as Description,
	ToastRoot as Root,
	ToastTitle as Title,
	ToastTrigger as Trigger,
	ToastViewport as Viewport,
	ToasterComponent as Toaster,
}
