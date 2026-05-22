import { createContext } from '../../utils/index.js'

export const [AccordionProvider, useAccordionContext] = createContext({
	hookName: 'useAccordionContext',
	providerName: '<Accordion.Root />',
})

export const [AccordionItemProvider, useAccordionItemContext] = createContext({
	hookName: 'useAccordionItemContext',
	providerName: '<Accordion.Item />',
})
