import { DatePickerRoot } from './date-picker-root.jsx'
import { DatePickerLabel } from './date-picker-label.jsx'
import { DatePickerTrigger } from './date-picker-trigger.jsx'
import { DatePickerPositioner } from './date-picker-positioner.jsx'
import { DatePickerContent } from './date-picker-content.jsx'
import { DatePickerInput } from './date-picker-input.jsx'
import { DatePickerView } from './date-picker-view.jsx'
import { DatePickerViewControl } from './date-picker-view-control.jsx'
import { DatePickerViewTrigger } from './date-picker-view-trigger.jsx'
import { DatePickerControl } from './date-picker-control.jsx'
import { DatePickerPrevTrigger } from './date-picker-prev-trigger.jsx'
import { DatePickerNextTrigger } from './date-picker-next-trigger.jsx'
import { DatePickerRangeText } from './date-picker-range-text.jsx'
import { DatePickerTable } from './date-picker-table.jsx'
import { DatePickerTableHead } from './date-picker-table-head.jsx'
import { DatePickerTableBody } from './date-picker-table-body.jsx'
import { DatePickerTableRow } from './date-picker-table-row.jsx'
import { DatePickerCell } from './date-picker-cell.jsx'
import { DatePickerCellTrigger } from './date-picker-cell-trigger.jsx'
import { DatePickerTableHeader } from './date-picker-table-header.jsx'
import { DatePickerWeekNumberCell } from './date-picker-week-number-cell.jsx'
import { DatePickerWeekNumberHeaderCell } from './date-picker-week-number-header-cell.jsx'
import { DatePickerMonthSelect } from './date-picker-month-select.jsx'
import { DatePickerYearSelect } from './date-picker-year-select.jsx'
import { DatePickerPresetTrigger } from './date-picker-preset-trigger.jsx'
import { DatePickerClearTrigger } from './date-picker-clear-trigger.jsx'
import { DatePickerCloseTrigger } from './date-picker-close-trigger.jsx'

const datePickerParts = {
	Root: DatePickerRoot,
	Label: DatePickerLabel,
	Trigger: DatePickerTrigger,
	Positioner: DatePickerPositioner,
	Content: DatePickerContent,
	Input: DatePickerInput,
	View: DatePickerView,
	ViewControl: DatePickerViewControl,
	ViewTrigger: DatePickerViewTrigger,
	Control: DatePickerControl,
	PrevTrigger: DatePickerPrevTrigger,
	NextTrigger: DatePickerNextTrigger,
	RangeText: DatePickerRangeText,
	Table: DatePickerTable,
	TableHead: DatePickerTableHead,
	TableBody: DatePickerTableBody,
	TableRow: DatePickerTableRow,
	Cell: DatePickerCell,
	CellTrigger: DatePickerCellTrigger,
	TableHeader: DatePickerTableHeader,
	WeekNumberCell: DatePickerWeekNumberCell,
	WeekNumberHeaderCell: DatePickerWeekNumberHeaderCell,
	MonthSelect: DatePickerMonthSelect,
	YearSelect: DatePickerYearSelect,
	PresetTrigger: DatePickerPresetTrigger,
	ClearTrigger: DatePickerClearTrigger,
	CloseTrigger: DatePickerCloseTrigger,
}

export const DatePicker = Object.assign(DatePickerRoot, datePickerParts)
export {
	DatePickerRoot as Root,
	DatePickerLabel as Label,
	DatePickerTrigger as Trigger,
	DatePickerPositioner as Positioner,
	DatePickerContent as Content,
	DatePickerInput as Input,
	DatePickerView as View,
	DatePickerViewControl as ViewControl,
	DatePickerViewTrigger as ViewTrigger,
	DatePickerControl as Control,
	DatePickerPrevTrigger as PrevTrigger,
	DatePickerNextTrigger as NextTrigger,
	DatePickerRangeText as RangeText,
	DatePickerTable as Table,
	DatePickerTableHead as TableHead,
	DatePickerTableBody as TableBody,
	DatePickerTableRow as TableRow,
	DatePickerCell as Cell,
	DatePickerCellTrigger as CellTrigger,
	DatePickerTableHeader as TableHeader,
	DatePickerWeekNumberCell as WeekNumberCell,
	DatePickerWeekNumberHeaderCell as WeekNumberHeaderCell,
	DatePickerMonthSelect as MonthSelect,
	DatePickerYearSelect as YearSelect,
	DatePickerPresetTrigger as PresetTrigger,
	DatePickerClearTrigger as ClearTrigger,
	DatePickerCloseTrigger as CloseTrigger,
}
