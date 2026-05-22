import './global.css'
import { NavLink, Route, Router, navigate, onMount, renderApp } from '@plastic-js/plastic'

import AccordionShowcase from '../src/components/accordion/showcases/AccordionShowcase.jsx'
import AvatarShowcase from '../src/components/avatar/showcases/AvatarShowcase.jsx'
import CarouselShowcase from '../src/components/carousel/showcases/CarouselShowcase.jsx'
import CheckboxShowcase from '../src/components/checkbox/showcases/CheckboxShowcase.jsx'
import ClipboardShowcase from '../src/components/clipboard/showcases/ClipboardShowcase.jsx'
import CollapsibleShowcase from '../src/components/collapsible/showcases/CollapsibleShowcase.jsx'
import ColorPickerShowcase from '../src/components/color-picker/showcases/ColorPickerShowcase.jsx'
import ComboboxShowcase from '../src/components/combobox/showcases/ComboboxShowcase.jsx'
import DateInputShowcase from '../src/components/date-input/showcases/DateInputShowcase.jsx'
import DatePickerShowcase from '../src/components/date-picker/showcases/DatePickerShowcase.jsx'
import DialogShowcase from '../src/components/dialog/showcases/DialogShowcase.jsx'
import DrawerShowcase from '../src/components/drawer/showcases/DrawerShowcase.jsx'
import FieldShowcase from '../src/components/field/showcases/FieldShowcase.jsx'
import FieldsetShowcase from '../src/components/fieldset/showcases/FieldsetShowcase.jsx'
import FileUploadShowcase from '../src/components/file-upload/showcases/FileUploadShowcase.jsx'
import FocusTrapShowcase from '../src/components/focus-trap/showcases/FocusTrapShowcase.jsx'
import HoverCardShowcase from '../src/components/hover-card/showcases/HoverCardShowcase.jsx'
import ListboxShowcase from '../src/components/listbox/showcases/ListboxShowcase.jsx'
import MenuShowcase from '../src/components/menu/showcases/MenuShowcase.jsx'
import NumberInputShowcase from '../src/components/number-input/showcases/NumberInputShowcase.jsx'
import PaginationShowcase from '../src/components/pagination/showcases/PaginationShowcase.jsx'
import PopoverShowcase from '../src/components/popover/showcases/PopoverShowcase.jsx'
import PresenceShowcase from '../src/components/presence/showcases/PresenceShowcase.jsx'
import ProgressShowcase from '../src/components/progress/showcases/ProgressShowcase.jsx'
import RadioGroupShowcase from '../src/components/radio-group/showcases/RadioGroupShowcase.jsx'
import RatingGroupShowcase from '../src/components/rating-group/showcases/RatingGroupShowcase.jsx'
import SelectShowcase from '../src/components/select/showcases/SelectShowcase.jsx'
import SignaturePadShowcase from '../src/components/signature-pad/showcases/SignaturePadShowcase.jsx'
import SliderShowcase from '../src/components/slider/showcases/SliderShowcase.jsx'
import SplitterShowcase from '../src/components/splitter/showcases/SplitterShowcase.jsx'
import StepsShowcase from '../src/components/steps/showcases/StepsShowcase.jsx'
import SwitchShowcase from '../src/components/switch/showcases/SwitchShowcase.jsx'
import TabsShowcase from '../src/components/tabs/showcases/TabsShowcase.jsx'
import TagsInputShowcase from '../src/components/tags-input/showcases/TagsInputShowcase.jsx'
import ToastShowcase from '../src/components/toast/showcases/ToastShowcase.jsx'
import TooltipShowcase from '../src/components/tooltip/showcases/TooltipShowcase.jsx'
import TourShowcase from '../src/components/tour/showcases/TourShowcase.jsx'
import TreeViewShowcase from '../src/components/tree-view/showcases/TreeViewShowcase.jsx'
import ToggleShowcase from '../src/components/toggle/showcases/ToggleShowcase.jsx'
import ToggleGroupShowcase from '../src/components/toggle-group/showcases/ToggleGroupShowcase.jsx'
import PortalShowcase from '../src/components/portal/showcases/PortalShowcase.jsx'

const showcases = [
	{ name: 'Accordion', path: '/accordion', Component: AccordionShowcase },
	{ name: 'Avatar', path: '/avatar', Component: AvatarShowcase },
	{ name: 'Carousel', path: '/carousel', Component: CarouselShowcase },
	{ name: 'Checkbox', path: '/checkbox', Component: CheckboxShowcase },
	{ name: 'Clipboard', path: '/clipboard', Component: ClipboardShowcase },
	{ name: 'Collapsible', path: '/collapsible', Component: CollapsibleShowcase },
	{ name: 'ColorPicker', path: '/color-picker', Component: ColorPickerShowcase },
	{ name: 'Combobox', path: '/combobox', Component: ComboboxShowcase },
	{ name: 'DateInput', path: '/date-input', Component: DateInputShowcase },
	{ name: 'DatePicker', path: '/date-picker', Component: DatePickerShowcase },
	{ name: 'Dialog', path: '/dialog', Component: DialogShowcase },
	{ name: 'Drawer', path: '/drawer', Component: DrawerShowcase },
	{ name: 'Field', path: '/field', Component: FieldShowcase },
	{ name: 'Fieldset', path: '/fieldset', Component: FieldsetShowcase },
	{ name: 'FileUpload', path: '/file-upload', Component: FileUploadShowcase },
	{ name: 'FocusTrap', path: '/focus-trap', Component: FocusTrapShowcase },
	{ name: 'HoverCard', path: '/hover-card', Component: HoverCardShowcase },
	{ name: 'Listbox', path: '/listbox', Component: ListboxShowcase },
	{ name: 'Menu', path: '/menu', Component: MenuShowcase },
	{ name: 'NumberInput', path: '/number-input', Component: NumberInputShowcase },
	{ name: 'Pagination', path: '/pagination', Component: PaginationShowcase },
	{ name: 'Popover', path: '/popover', Component: PopoverShowcase },
	{ name: 'Presence', path: '/presence', Component: PresenceShowcase },
	{ name: 'Progress', path: '/progress', Component: ProgressShowcase },
	{ name: 'RadioGroup', path: '/radio-group', Component: RadioGroupShowcase },
	{ name: 'RatingGroup', path: '/rating-group', Component: RatingGroupShowcase },
	{ name: 'Select', path: '/select', Component: SelectShowcase },
	{ name: 'SignaturePad', path: '/signature-pad', Component: SignaturePadShowcase },
	{ name: 'Slider', path: '/slider', Component: SliderShowcase },
	{ name: 'Splitter', path: '/splitter', Component: SplitterShowcase },
	{ name: 'Steps', path: '/steps', Component: StepsShowcase },
	{ name: 'Switch', path: '/switch', Component: SwitchShowcase },
	{ name: 'Tabs', path: '/tabs', Component: TabsShowcase },
	{ name: 'TagsInput', path: '/tags-input', Component: TagsInputShowcase },
	{ name: 'Toast', path: '/toast', Component: ToastShowcase },
	{ name: 'Tooltip', path: '/tooltip', Component: TooltipShowcase },
	{ name: 'Tour', path: '/tour', Component: TourShowcase },
	{ name: 'Toggle', path: '/toggle', Component: ToggleShowcase },
	{ name: 'ToggleGroup', path: '/toggle-group', Component: ToggleGroupShowcase },
	{ name: 'TreeView', path: '/tree-view', Component: TreeViewShowcase },
	{ name: 'Portal', path: '/portal', Component: PortalShowcase },
]

const Home = ()=> {
	onMount(()=> navigate('/accordion', { replace: true }))
	return null
}

const routes = [
	<Route component={Home} path='/' />,
	...showcases.map((s)=> <Route component={s.Component} key={s.path} path={s.path} />),
]

const Sidebar = ()=> (
	<aside className='sidebar'>
		<h2>Components</h2>
		{showcases.map((s)=> (
			<NavLink activeClass='active' className='nav-btn' key={s.path} to={s.path}>
				{s.name}
			</NavLink>
		))}
	</aside>
)

renderApp(
	document.getElementById('app'),
	<div className='app'>
		<Sidebar />
		<main className='main'>
			<Router>{routes}</Router>
		</main>
	</div>,
)
