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

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Ads() {
	const [banners, setBanners] = useState<Banner[]>([])
	const [loading, setLoading] = useState(true)
	const [currentIndex, setCurrentIndex] = useState(0)

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

				if (!response.ok) {
					throw new Error(`Failed to fetch banners: ${response.status} ${response.statusText}`)
				}

				const contentType = response.headers.get('content-type')
				if (!contentType || !contentType.includes('application/json')) {
					throw new Error('Received non-JSON response from banner API')
				}

				const data = await response.json()
				const results = Array.isArray(data) ? data : data.results || []
				setBanners(results)
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

	// Auto-slide functionality
	useEffect(() => {
		if (banners.length <= 1) return

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % banners.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [banners.length])

	const nextSlide = (e?: React.MouseEvent) => {
		e?.stopPropagation()
		setCurrentIndex((prev) => (prev + 1) % banners.length)
	}

	const prevSlide = (e?: React.MouseEvent) => {
		e?.stopPropagation()
		setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
	}

	const goToSlide = (index: number, e: React.MouseEvent) => {
		e.stopPropagation()
		setCurrentIndex(index)
	}

	if (loading) {
		return <div className='w-full h-[600px] max-md:h-[150px] bg-gray-100 animate-pulse rounded-2xl mt-2' />
	}

	if (!banners || banners.length === 0) {
		return null
	}

	const banner = banners[currentIndex]
	// Tilga qarab title va description tanlash
	const title = language === 'ru' ? banner.title_ru : banner.title_uz
	const description =
		language === 'ru' ? banner.description_ru : banner.description_uz

	return (
		<div
			className='w-full h-[600px] max-md:h-[200px] relative rounded-2xl overflow-hidden shadow-md mt-2 cursor-pointer group'
			onClick={() => window.open(banner.link, '_blank')}
		>
			{/* Slides Container */}
			<div className='absolute inset-0 transition-opacity duration-500'>
				<Image
					src={banner.image}
					alt={title}
					fill
					key={banner.id} // Re-render animation update
					className='object-cover'
					priority
				/>

				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

				{/* Title and Description */}
				<div key={`text-${banner.id}`} className='absolute bottom-8 left-4 right-4 md:left-8 md:right-16 text-white animate-in slide-in-from-bottom-4 duration-500'>
					<h2 className='text-2xl md:text-5xl font-bold leading-tight mb-2 md:mb-4 drop-shadow-lg'>{title}</h2>
					<p className='text-sm md:text-xl text-white/90 line-clamp-2 md:line-clamp-3 max-w-3xl drop-shadow-md'>
						{description}
					</p>
				</div>
			</div>

			{/* Navigation Arrows (Only show if > 1 banner) */}
			{banners.length > 1 && (
				<>
					<button
						onClick={prevSlide}
						className='absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 hidden md:block'
					>
						<ChevronLeft size={32} />
					</button>
					<button
						onClick={nextSlide}
						className='absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 hidden md:block'
					>
						<ChevronRight size={32} />
					</button>

					{/* Pagination Dots */}
					<div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20'>
						{banners.map((_, index) => (
							<button
								key={index}
								onClick={(e) => goToSlide(index, e)}
								className={`
									h-2 rounded-full transition-all duration-300 
									${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}
								`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
