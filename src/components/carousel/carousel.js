import { CarouselRoot } from './carousel-root.jsx'
import { CarouselControl } from './carousel-control.jsx'
import { CarouselItemGroup } from './carousel-item-group.jsx'
import { CarouselItem } from './carousel-item.jsx'
import { CarouselPrevTrigger } from './carousel-prev-trigger.jsx'
import { CarouselNextTrigger } from './carousel-next-trigger.jsx'
import { CarouselIndicatorGroup } from './carousel-indicator-group.jsx'
import { CarouselIndicator } from './carousel-indicator.jsx'
import { CarouselAutoplayTrigger } from './carousel-autoplay-trigger.jsx'
import { CarouselProgressText } from './carousel-progress-text.jsx'

const carouselParts = {
	Root: CarouselRoot,
	Control: CarouselControl,
	ItemGroup: CarouselItemGroup,
	Item: CarouselItem,
	PrevTrigger: CarouselPrevTrigger,
	NextTrigger: CarouselNextTrigger,
	IndicatorGroup: CarouselIndicatorGroup,
	Indicator: CarouselIndicator,
	AutoplayTrigger: CarouselAutoplayTrigger,
	ProgressText: CarouselProgressText,
}

export const Carousel = Object.assign(CarouselRoot, carouselParts)
export {
	CarouselRoot as Root,
	CarouselControl as Control,
	CarouselItemGroup as ItemGroup,
	CarouselItem as Item,
	CarouselPrevTrigger as PrevTrigger,
	CarouselNextTrigger as NextTrigger,
	CarouselIndicatorGroup as IndicatorGroup,
	CarouselIndicator as Indicator,
	CarouselAutoplayTrigger as AutoplayTrigger,
	CarouselProgressText as ProgressText,
}
