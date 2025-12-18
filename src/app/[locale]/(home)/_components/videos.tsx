'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

interface Video {
	id: number
	title: string
	url: string
	description: string
	added_at: string
}

export default function Videos() {
	const locale = useLocale()
	const [videos, setVideos] = useState<Video[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/${locale}/api/youtube/header/list/`)
			.then(res => res.json())
			.then(data => {
				setVideos(data.results)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error fetching videos:', err)
				setLoading(false)
			})
	}, [])

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
							{video.title}
						</h3>
					</div>
				</div>
			))}
		</div>
	)
}
