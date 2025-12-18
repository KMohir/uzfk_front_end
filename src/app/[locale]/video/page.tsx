'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

interface Video {
	id: number
	title: string
	url: string
	description: string
	added_at: string
}

interface ApiResponse {
	results: Video[]
	next: string | null
	previous: string | null
	count: number
}

export default function VideoPage() {
	const t = useTranslations()
	const locale = useLocale()
	const [videos, setVideos] = useState<Video[]>([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const videosPerPage = 12

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}/${locale}/api/youtube/header/list/?page=${currentPage}`
				)
				if (!response.ok) {
					throw new Error(`HTTP xato! Status: ${response.status}`)
				}
				const data: ApiResponse = await response.json()
				setVideos(data.results || [])
				setTotalPages(Math.ceil((data.count || 0) / videosPerPage))
			} catch (error) {
				console.error('Videolarni yuklashda xatolik:', error)
				setVideos([])
			} finally {
				setLoading(false)
			}
		}

		fetchVideos()
	}, [currentPage, locale])

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const getDisplayedPages = () => {
		const pages = []
		const maxDisplayedPages = 10
		let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
		let endPage = startPage + maxDisplayedPages - 1

		if (endPage > totalPages) {
			endPage = totalPages
			startPage = Math.max(1, endPage - maxDisplayedPages + 1)
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i)
		}

		return pages
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-white dark:bg-gray-600 py-24'>
				<div className='container mx-auto px-4 md:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(6)].map((_, i) => (
							<div key={i} className='bg-gray-100 rounded-lg animate-pulse'>
								<div className='aspect-video bg-gray-200' />
								<div className='p-4'>
									<div className='h-6 bg-gray-200 rounded w-3/4' />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-white dark:bg-gray-600 py-24'>
			<div className='container mx-auto px-4 md:px-8'>
				<h1 className='text-3xl md:text-4xl font-bold text-center mb-8 text-green-700 dark:text-white'>
					{t('videos')}
				</h1>

				{videos.length === 0 ? (
					<div className='text-center py-20'>
						<p className='text-xl text-gray-500'>Videolar topilmadi</p>
					</div>
				) : (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{videos.map(video => (
								<div
									key={video.id}
									className='bg-white dark:bg-gray-500 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow'
								>
									<div className='relative aspect-video'>
										<iframe
											src={video.url}
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											allowFullScreen
											className='absolute top-0 left-0 w-full h-full'
										/>
									</div>
									<div className='p-4'>
										<h3 className='text-lg font-semibold text-blue-600 dark:text-white line-clamp-2'>
											{video.title}
										</h3>
										{video.description && (
											<p className='text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-2'>
												{video.description}
											</p>
										)}
									</div>
								</div>
							))}
						</div>

						{totalPages > 1 && (
							<div className='flex justify-center mt-8 space-x-2 flex-wrap gap-2'>
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									className='px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed'
								>
									⬅️
								</button>

								{getDisplayedPages().map(page => (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-4 py-2 border rounded-md transition-colors ${currentPage === page
											? 'bg-blue-600 text-white'
											: 'bg-white text-blue-600 hover:bg-blue-100'
											}`}
									>
										{page}
									</button>
								))}

								<button
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									className='px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed'
								>
									➡️
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
