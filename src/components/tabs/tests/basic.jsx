import { Tabs } from '../index.js'
import { h } from '../../../runtime.js'

export const ComponentUnderTest = (props) => (
	h(Tabs.Root, { defaultValue: 'a', activationMode: 'manual', ...props,
		children: [
			h(Tabs.List, null,
				h(Tabs.Trigger, { value: 'a' }, 'Tab A'),
				h(Tabs.Trigger, { value: 'b' }, 'Tab B'),
			),
			h(Tabs.Content, { value: 'a' }, 'Content A'),
			h(Tabs.Content, { value: 'b' }, 'Content B'),
		],
	})
)
