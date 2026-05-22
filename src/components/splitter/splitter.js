import { SplitterPanel } from './splitter-panel.jsx'
import { SplitterResizeTrigger } from './splitter-resize-trigger.jsx'
import { SplitterResizeTriggerIndicator } from './splitter-resize-trigger-indicator.jsx'
import { SplitterRoot } from './splitter-root.jsx'

const splitterParts = {
	Root: SplitterRoot,
	Panel: SplitterPanel,
	ResizeTrigger: SplitterResizeTrigger,
	ResizeTriggerIndicator: SplitterResizeTriggerIndicator,
}

export const Splitter = Object.assign(SplitterRoot, splitterParts)
export {
	SplitterRoot as Root,
	SplitterPanel as Panel,
	SplitterResizeTrigger as ResizeTrigger,
	SplitterResizeTriggerIndicator as ResizeTriggerIndicator,
}
