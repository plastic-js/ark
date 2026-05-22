import { TabsContent } from './tabs-content.jsx'
import { TabsIndicator } from './tabs-indicator.jsx'
import { TabsList } from './tabs-list.jsx'
import { TabsRoot } from './tabs-root.jsx'
import { TabsTrigger } from './tabs-trigger.jsx'

const tabsParts = {
	Root: TabsRoot,
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
	Indicator: TabsIndicator,
}

export const Tabs = Object.assign(TabsRoot, tabsParts)
export {
	TabsContent as Content,
	TabsIndicator as Indicator,
	TabsList as List,
	TabsRoot as Root,
	TabsTrigger as Trigger,
}
