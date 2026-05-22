import { ark } from '../factory.js'

export const FieldItem = (props = {})=> ark.div({ 'data-part': 'item', ...props })
