/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { useLocale } from 'next-intl'

import { Calendar } from '@/app/[locale]/components/ui/calendar'

export function CalendarDemo() {
	const locale = useLocale()
	const [date, setDate] = React.useState<Date | undefined>(new Date()) // Tanlangan sana
	const [news, setNews] = React.useState<any[]>([]) // API dan kelgan yangiliklar
	const [loading, setLoading] = React.useState(false) // Yuklanish holati

	// Backend API'dan yangiliklarni olish
	const fetchNews = async (selectedDate: Date) => {
		setLoading(true) // Yuklanishni boshlash
		try {
			// Sanani 'YYYY-MM-DD' formatiga o'zgartirish
			const year = selectedDate.getFullYear()
			const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
			const day = String(selectedDate.getDate()).padStart(2, '0')
			const formattedDate = `${year}-${month}-${day}`

			// API so'rovi
			const apiLocale = locale === 'oz' ? 'uz' : locale
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/date-filter/?date=${formattedDate}`
			)
			if (!response.ok) {
				throw new Error('Serverdan yangiliklarni olishda xatolik!')
			}

			const data = await response.json()
			setNews(data.results || []) // Yangiliklar to'g'ridan-to'g'ri JSON obyekt sifatida
		} catch (error) {
			console.error('Yangiliklarni olishda xatolik:', error)
			setNews([]) // Xatolik bo'lsa yangiliklarni bo'sh qilamiz
		} finally {
			setLoading(false) // Yuklanish tugadi
		}
	}

	// Sana o'zgarganda API so'rov yuborish
	const handleDateSelect = (selectedDate: Date | undefined) => {
		setDate(selectedDate)
		if (selectedDate) {
			fetchNews(selectedDate)
		}
	}

	return (
		<div className='space-y-4'>
			<Calendar
				mode='single'
				selected={date}
				onSelect={handleDateSelect}
				className='rounded-md border shadow w-full bg-white flex justify-center'
			/>

			{/* Yangiliklar ko'rinishi */}
			<div className='rounded-md dark:border-none border p-4 shadow w-full dark:bg-blue-800/40 bg-white'>
				<h3 className='font-bold mb-2 text-blue-600 dark:text-white '>
					Yangiliklar:
				</h3>
				{loading ? (
					<p>Yuklanmoqda...</p>
				) : news.length > 0 ? (
					<ul className='list-disc list-outside flex flex-col gap-3 text-start pl-4'>
						{news.map(item => (
							<li
								key={item.id}
								className='text-sm border border-gray-300 bg-gray-50 p-3 rounded-md shadow-sm'
							>
								<a
									href={`/news/${item.slug}`}
									className='text-blue-600 hover:text-blue-800 hover:underline font-medium'
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				) : (
					<p className='text-gray-600 dark:text-white'>
						Bu kunda yangilik yo`q.
					</p>
				)}
			</div>
		</div>
	)
}
