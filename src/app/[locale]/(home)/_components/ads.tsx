'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Banner {
	id: number
	title_uz: string
	title_ru: string
	description_uz: string
	description_ru: string
	image: string
	link: string
}

export default function Ads() {
	const [banners, setBanners] = useState<Banner[]>([])
	const [loading, setLoading] = useState(true)

	// URL-dagi tilni aniqlash
	const pathname = usePathname()
	const language = pathname.startsWith('/ru') ? 'ru' : 'uz'

	useEffect(() => {
		const fetchBanners = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}/uz/api/banner/most_read/list/`,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					}
				)
				const data = await response.json()
				setBanners(Array.isArray(data) ? data : data.results || [])
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error fetching banners:', error)
				setBanners([])
			} finally {
				setLoading(false)
			}
		}

		fetchBanners()
	}, [])

	if (loading) {
		return <div className='p-4'>Loading banners...</div>
	}

	if (!banners || banners.length === 0) {
		return <div className='p-4'>No banners available</div>
	}

	const banner = banners[0]

	// Tilga qarab title va description tanlash
	const title = language === 'ru' ? banner.title_ru : banner.title_uz
	const description =
		language === 'ru' ? banner.description_ru : banner.description_uz

	return (
		<div
			className='w-full h-[600px] max-md:h-[150px] relative rounded-2xl overflow-hidden shadow-md mt-2 cursor-pointer group'
			onClick={() => window.open(banner.link, '_blank')}
		>
			{/* Background Image */}
			<Image
				src={banner.image}
				alt={title}
				fill
				className='object-cover transition-transform group-hover:scale-105 duration-300'
			/>

			{/* Gradient Overlay */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

			{/* Title and Description */}
			<div className='absolute bottom-4 left-4 right-4 text-white'>
				<h2 className='text-3xl font-semibold max-md:text-sm'>{title}</h2>
				<p className='mt-2 text-xl max-md:text-xs line-clamp-2'>
					{description}
				</p>
			</div>
		</div>
	)
}
