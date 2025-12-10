'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Announcement {
	id: number
	title: string
	description: string
	image: string
	date: string
	location: string
	slug: string
}

export default function Announcements() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/ru/api/elon/most_read/list/`)
			.then(res => res.json())
			.then(data => {
				setAnnouncements(data.results)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error fetching announcements:', err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center py-8'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600'></div>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{announcements.slice(0, 4).map(announcement => (
				<Link
					key={announcement.id}
					href={`/announcements/${announcement.slug}`}
					className='block bg-white group dark:bg-gray-500 rounded-lg shadow-2xl overflow-hidden hover:shadow-lg transition-shadow'
				>
					<div className='relative h-28 md:h-48'>
						<Image
							src={announcement.image}
							alt={announcement.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
					<div className='p-4'>
						<h3 className='font-semibold text-center text-base md:text-lg mb-2 group-hover:text-green-500 text-blue-600 dark:text-white'>
							{announcement.title}
						</h3>
						<p className='text-gray-600 text-sm mb-3'>
							{announcement.description}
						</p>
						<div className='flex justify-between text-sm text-gray-500'>
							<span>{announcement.location}</span>
							<span>{announcement.date}</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}
