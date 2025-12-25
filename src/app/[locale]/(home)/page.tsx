'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'

import HeroNews from './components/HeroNews'
import Ads from './_components/ads'
import StatsGrid from './components/StatsGrid'
import MapCalendar from './components/MapCalendar'
import VideoGallery from './components/VideoGallery'
import PressCards from './components/PressCards'

interface News {
	id: number
	title_uz: string
	title_oz: string
	title_ru: string
	subtitle_uz: string
	subtitle_oz: string
	subtitle_ru: string
	image: string
	slug: string
	created_at: string
}

export default function Page() {
	const locale = useLocale()

	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const apiLocale = 'ru'
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/list/`)
			.then(res => res.json())
			.then(data => {
				setNews(data.results)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error loading news:', err)
				setLoading(false)
			})
	}, [locale])

	if (loading) {
		return <div className="h-screen flex items-center justify-center bg-accent/20">Loading...</div>
	}

	// Filter out duplicates based on ID
	const uniqueNews = news.filter((item, index, self) =>
		index === self.findIndex((t) => t.id === item.id)
	)

	const mainNews = uniqueNews[0] || null
	const otherNews = uniqueNews.slice(1, 5)

	return (
		<div className="flex flex-col">
			{/* 1. Hero Section with News */}
			<div className='container mx-auto px-4 hidden md:block'>
				<div className='py-2 overflow-hidden'>
					<Ads />
				</div>
			</div>
			<HeroNews mainNews={mainNews} otherNews={otherNews} />

			{/* 2. Stats Counters */}
			<StatsGrid />

			{/* 3. Interactive Map & Calendar */}
			<MapCalendar />

			{/* 4. Video Gallery */}
			<VideoGallery />

			{/* 5. Press/Interactive Cards */}
			<PressCards />
		</div>
	)
}
