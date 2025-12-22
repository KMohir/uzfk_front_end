'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/app/[locale]/lib/utils'
import { buttonVariants } from '@/app/[locale]/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-4', className)} // Ichki paddingni kattalashtirish
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4 text-blue-600',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-lg font-bold', // Katta va semiz shrift
				nav: 'space-x-1 flex items-center', // Kengroq tugma oralig'i
				nav_button: cn(
					buttonVariants({ variant: 'outline' }),
					'h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100' // Tugmalar kattaroq
				),
				nav_button_previous: 'absolute left-2',
				nav_button_next: 'absolute right-2',
				table: 'w-full border-collapse space-y-2', // Yangi qatorlar oralig'i kattaroq
				head_row: 'flex',
				head_cell:
					'text-blue-900 text-xs rounded-md w-10 font-semibold', // Katta shrift
				row: 'flex w-full mt-2',
				cell: cn(
					'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
					props.mode === 'range'
						? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
						: '[&:has([aria-selected])]:rounded-md'
				),
				day: cn(
					buttonVariants({ variant: 'ghost' }),
					'h-10 w-10 p-0 font-semibold text-sm aria-selected:opacity-100 text-blue-500' // Kattaroq kunlar
				),
				day_range_start: 'day-range-start',
				day_range_end: 'day-range-end',
				day_selected:
					'bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white text-sm',
				day_today: 'bg-accent text-blue-500',
				day_outside:
					'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
				day_disabled: 'text-muted-foreground opacity-50',
				day_range_middle:
					'aria-selected:bg-accent aria-selected:text-accent-foreground',
				day_hidden: 'invisible',
				...classNames,
			}}
			{...props}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
