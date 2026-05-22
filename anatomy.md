# Anatomy

> **Auto-generated** — run `npm run gen:anatomy` to regenerate after changing any `*.anatomy.js` file.

Every rendered element in ark-plastic carries two HTML attributes:

- `data-scope` — identifies the component (e.g. `"dialog"`).
- `data-part` — identifies the structural role within that component (e.g. `"content"`).

These two attributes together give you stable CSS selectors without class-name management:

```css
[data-scope="dialog"][data-part="content"] { background: white; }
[data-scope="dialog"][data-part="content"][data-state="open"] { animation: fadeIn 200ms ease; }
```

## Anatomy object API

Each component exports a named anatomy object (e.g. `accordionAnatomy`). The object exposes:

| Method | Returns | Description |
|---|---|---|
| `.keys()` | `string[]` | List of registered part names (camelCase). |
| `.build()` | `Record<part, { selector, attrs }>` | Generate selectors and attribute objects for all parts. |
| `.extendWith(...parts)` | anatomy | Return a new anatomy with additional plastic-specific parts appended. |

```js
import { accordionAnatomy } from "ark-plastic/accordion"

accordionAnatomy.keys()
// → ["root", "item", "itemTrigger", "itemContent", "itemIndicator"]

const parts = accordionAnatomy.build()
parts.itemTrigger.attrs     // → { "data-scope": "accordion", "data-part": "item-trigger" }
parts.itemTrigger.selector  // → '[data-scope="accordion"][data-part="item-trigger"]'
```

## Anatomy strategies

| Strategy | When used | Example |
|---|---|---|
| **Zag-js re-export** | Component has a `@zag-js/*` package with its own anatomy. Part names and selectors stay in sync automatically. | `export { anatomy as accordionAnatomy } from '@zag-js/accordion'` |
| **Zag-js extended** | Component needs Plastic-specific extra parts on top of the Zag-js baseline. | `anatomy.extendWith('group')` |
| **Custom** | No Zag-js equivalent exists (e.g. `field`, `fieldset`). Anatomy is defined with the local `createAnatomy` utility. | `createAnatomy('field').parts('root', 'label', ...)` |

## Per-component anatomy

| Component | Export | Strategy | Parts |
|---|---|---|---|
| Accordion | `accordionAnatomy` | Zag-js re-export | `root`, `item`, `itemTrigger`, `itemContent`, `itemIndicator` |
| Carousel | `carouselAnatomy` | Zag-js extended | `root`, `itemGroup`, `item`, `control`, `nextTrigger`, `prevTrigger`, `indicatorGroup`, `indicator`, `autoplayTrigger`, `progressText`, `autoplayIndicator` |
| Checkbox | `checkboxAnatomy` | Zag-js extended | `root`, `label`, `control`, `indicator`, `group` |
| Collapsible | `collapsibleAnatomy` | Zag-js re-export | `root`, `trigger`, `content`, `indicator` |
| ColorPicker | `colorPickerAnatomy` | Zag-js extended | `root`, `label`, `control`, `trigger`, `positioner`, `content`, `area`, `areaThumb`, `valueText`, `areaBackground`, `channelSlider`, `channelSliderLabel`, `channelSliderTrack`, `channelSliderThumb`, `channelSliderValueText`, `channelInput`, `transparencyGrid`, `swatchGroup`, `swatchTrigger`, `swatchIndicator`, `swatch`, `eyeDropperTrigger`, `formatTrigger`, `formatSelect`, `view`, `hiddenInput`, `input`, `valueSwatch` |
| Combobox | `comboboxAnatomy` | Zag-js extended | `root`, `clearTrigger`, `content`, `control`, `input`, `item`, `itemGroup`, `itemGroupLabel`, `itemIndicator`, `itemText`, `label`, `list`, `positioner`, `trigger`, `empty` |
| DateInput | `dateInputAnatomy` | Zag-js re-export | `root`, `label`, `control`, `segmentGroup`, `segment`, `hiddenInput` |
| DatePicker | `datePickerAnatomy` | Zag-js extended | `clearTrigger`, `content`, `control`, `input`, `label`, `monthSelect`, `nextTrigger`, `positioner`, `presetTrigger`, `prevTrigger`, `rangeText`, `root`, `table`, `tableBody`, `tableCell`, `tableCellTrigger`, `tableHead`, `tableHeader`, `tableRow`, `trigger`, `view`, `viewControl`, `viewTrigger`, `yearSelect`, `valueText` |
| Dialog | `dialogAnatomy` | Zag-js re-export | `trigger`, `backdrop`, `positioner`, `content`, `title`, `description`, `closeTrigger` |
| Drawer | `drawerAnatomy` | Zag-js extended | `positioner`, `content`, `title`, `description`, `trigger`, `backdrop`, `grabber`, `grabberIndicator`, `closeTrigger`, `swipeArea`, `indent`, `indentBackground` |
| Field | `fieldAnatomy` | Custom | `root`, `errorText`, `helperText`, `input`, `label`, `select`, `textarea`, `requiredIndicator` |
| Fieldset | `fieldsetAnatomy` | Custom | `root`, `errorText`, `helperText`, `legend` |
| FileUpload | `fileUploadAnatomy` | Zag-js re-export | `root`, `dropzone`, `item`, `itemDeleteTrigger`, `itemGroup`, `itemName`, `itemPreview`, `itemPreviewImage`, `itemSizeText`, `label`, `trigger`, `clearTrigger` |
| FocusTrap | `focusTrapAnatomy` | Custom | `root` |
| HoverCard | `hoverCardAnatomy` | Zag-js re-export | `arrow`, `arrowTip`, `trigger`, `positioner`, `content` |
| Listbox | `listboxAnatomy` | Zag-js extended | `label`, `input`, `item`, `itemText`, `itemIndicator`, `itemGroup`, `itemGroupLabel`, `content`, `root`, `valueText`, `empty` |
| Menu | `menuAnatomy` | Zag-js extended | `arrow`, `arrowTip`, `content`, `contextTrigger`, `indicator`, `item`, `itemGroup`, `itemGroupLabel`, `itemIndicator`, `itemText`, `positioner`, `separator`, `trigger`, `triggerItem`, `checkboxItem`, `radioItem`, `radioItemGroup` |
| NumberInput | `numberInputAnatomy` | Zag-js re-export | `root`, `label`, `input`, `control`, `valueText`, `incrementTrigger`, `decrementTrigger`, `scrubber` |
| Pagination | `paginationAnatomy` | Zag-js re-export | `root`, `item`, `ellipsis`, `firstTrigger`, `prevTrigger`, `nextTrigger`, `lastTrigger` |
| Popover | `popoverAnatomy` | Zag-js re-export | `arrow`, `arrowTip`, `anchor`, `trigger`, `indicator`, `positioner`, `content`, `title`, `description`, `closeTrigger` |
| Presence | `presenceAnatomy` | Custom | `root` |
| Progress | `progressAnatomy` | Zag-js re-export | `root`, `label`, `track`, `range`, `valueText`, `view`, `circle`, `circleTrack`, `circleRange` |
| RadioGroup | `radioGroupAnatomy` | Zag-js re-export | `root`, `label`, `item`, `itemText`, `itemControl`, `indicator` |
| RatingGroup | `ratingGroupAnatomy` | Zag-js extended | `root`, `label`, `item`, `control`, `hiddenInput`, `itemText` |
| Select | `selectAnatomy` | Zag-js re-export | `label`, `positioner`, `trigger`, `indicator`, `clearTrigger`, `item`, `itemText`, `itemIndicator`, `itemGroup`, `itemGroupLabel`, `list`, `content`, `root`, `control`, `valueText` |
| SignaturePad | `signaturePadAnatomy` | Zag-js re-export | `root`, `control`, `segment`, `segmentPath`, `guide`, `clearTrigger`, `label` |
| Slider | `sliderAnatomy` | Zag-js extended | `root`, `label`, `thumb`, `valueText`, `track`, `range`, `control`, `markerGroup`, `marker`, `draggingIndicator`, `hiddenInput` |
| Splitter | `splitterAnatomy` | Zag-js re-export | `root`, `panel`, `resizeTrigger`, `resizeTriggerIndicator` |
| Switch | `switchAnatomy` | Zag-js re-export | `root`, `label`, `control`, `thumb` |
| Tabs | `tabsAnatomy` | Zag-js re-export | `root`, `list`, `trigger`, `content`, `indicator` |
| TagsInput | `tagsInputAnatomy` | Zag-js re-export | `root`, `label`, `control`, `input`, `clearTrigger`, `item`, `itemPreview`, `itemInput`, `itemText`, `itemDeleteTrigger` |
| Toast | `toastAnatomy` | Zag-js extended | `group`, `root`, `title`, `description`, `actionTrigger`, `closeTrigger`, `trigger`, `viewport` |
| Tooltip | `tooltipAnatomy` | Zag-js re-export | `trigger`, `arrow`, `arrowTip`, `positioner`, `content` |
| Tour | `tourAnatomy` | Zag-js extended | `content`, `actionTrigger`, `closeTrigger`, `progressText`, `title`, `description`, `positioner`, `arrow`, `arrowTip`, `backdrop`, `spotlight`, `control`, `trigger` |
| TreeView | `treeViewAnatomy` | Zag-js re-export | `branch`, `branchContent`, `branchControl`, `branchIndentGuide`, `branchIndicator`, `branchText`, `branchTrigger`, `item`, `itemIndicator`, `itemText`, `label`, `nodeCheckbox`, `nodeRenameInput`, `root`, `tree` |
