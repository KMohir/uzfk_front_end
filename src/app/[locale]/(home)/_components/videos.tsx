'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

interface Video {
	id: number
	title_uz: string
	title_oz: string
	title_ru: string
	url: string
	description_uz: string
	description_oz: string
	description_ru: string
	added_at: string
}

export default function Videos() {
	const locale = useLocale()
	const [videos, setVideos] = useState<Video[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const apiLocale = locale === 'oz' ? 'uz' : locale
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/youtube/header/list/`)
			.then(res => res.json())
			.then(data => {
				setVideos(data.results)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error fetching videos:', err)
				setLoading(false)
			})
	}, [locale])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{videos.slice(0, 4).map(video => (
				<div
					key={video.url}
					className='bg-white hover:bg-gray-200 group rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow'
				>
					<div className='relative aspect-video'>
						<iframe
							src={video.url}
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							className='absolute top-0 left-0 w-full h-full'
						/>
					</div>
					{/* Title bo'limi */}
					<div className='p-4 bg-gray-50 dark:bg-gray-600 dark:text-white'>
						<h3 className='text-lg font-semibold text-blue-600 group-hover:text-green-600 truncate dark:text-white'>
							{locale === 'ru' ? video.title_ru : locale === 'oz' ? (video.title_oz || video.title_uz) : video.title_uz}
						</h3>
					</div>
				</div>
			))}
		</div>
	)
}
