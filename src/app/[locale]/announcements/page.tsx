'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

interface Announcement {
	id: number
	title: string
	description: string
	image: string
	created_at: string
	location: string
	slug: string
	content: string
	added_at: string
}

export default function AnnouncementsPage() {
	const locale = useLocale()
	const [announcements, setAnnouncements] = useState<Announcement[]>([])
	const [visibleCount, setVisibleCount] = useState(4) // Ko'rsatiladigan e'lonlar soni
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/${locale}/api/elon/most_read/list/`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				return res.json()
			})
			.then(data => {
				setAnnouncements(data.results)
				setIsLoading(false)
			})
			.catch(err => {
				setError(
					err instanceof Error ? err.message : 'E`lonlar yuklanishida xatolik'
				)
				console.error('Error fetching announcements:', err)
				setIsLoading(false)
			})
	}, [locale])

	if (isLoading) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='text-red-500 text-center'>
					<h2 className='text-2xl font-bold mb-2'>Xatolik yuz berdi</h2>
					<p>{error}</p>
				</div>
			</div>
		)
	}

	// "Yana yuklash" tugmasi bosilganda chaqiriladi
	const loadMoreAnnouncements = () => {
		setVisibleCount(prevCount => prevCount + 4)
	}

	return (
		<div className='min-h-screen bg-[#ffffff] dark:bg-gray-600'>
			<div className='container mx-auto px-4 md:px-8 py-24'>
				{/* E'lonlar ro'yxati */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{announcements.slice(0, visibleCount).map(announcement => (
						<Link
							key={announcement.id}
							href={`/announcements/${announcement.slug}`}
							className='group'
						>
							<div className='bg-white dark:bg-gray-500 rounded-lg shadow-2xl overflow-hidden group-hover:shadow-2xl transition-shadow duration-300 group'>
								<div className='relative h-48'>
									<Image
										src={announcement.image}
										alt={announcement.title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-6 h-32'>
									<h2 className='text-xl text-center font-semibold dark:text-white text-blue-600 mb-2 transition-colors duration-300 group-hover:text-green-600'>
										{announcement.title.slice(0, 20) + '...'}
									</h2>
									<div className='flex items-center text-sm text-gray-500'>
										<span className='mr-4 dark:text-white'>
											📅{' '}
											{new Date(announcement.added_at)
												.toLocaleDateString('uz-UZ', {
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
												})
												.replace(/\./g, '/')}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
				{/* Yana yuklash tugmasi */}
				{visibleCount < announcements.length && (
					<div className='flex justify-center mt-8'>
						<button
							onClick={loadMoreAnnouncements}
							className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
						>
							Yana yuklash
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
