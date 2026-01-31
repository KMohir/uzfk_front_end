'use client'

import { FC, useState, SVGProps, CSSProperties } from 'react'
import { IRegion, regionsPathArray } from './map-array'
import { useLocale } from 'next-intl'

interface RegionApiData {
	id: number
	hudud: string
	hudud_uz: string
	hudud_ru: string
	name: string
	name_uz: string
	name_ru: string
	image: string
	address?: string
	// Add other fields if necessary
}

interface RegionsMapProps extends SVGProps<SVGSVGElement> {
	defaultFillColor?: string
	selectedFillColor?: string
	selectedStyle?: CSSProperties
	handleClick?: (regionId: string) => void
	regions?: RegionApiData[]
}

export const RegionsMap: FC<RegionsMapProps> = ({
	defaultFillColor = '#ebb77a',
	selectedFillColor = '#078D3A',
	selectedStyle = {},
	handleClick,
	regions = [],
	...props
}) => {
	const locale = useLocale()
	const [curRegion, setCurRegion] = useState(
		regionsPathArray[regionsPathArray.length - 1]
	)

	const [hoveredRegion, setHoveredRegion] = useState<IRegion | null>(null)
	const [hoveredApiData, setHoveredApiData] = useState<RegionApiData | null>(null)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

	// Sort patterns define unique keywords for each region
	const sortPatterns = [
		['qoraqalpog', 'karakalpak', 'коракалпог'],
		['andijon', 'andijan', 'андижон'],
		['buxoro', 'bukhara', 'бухоро'],
		['jizz', 'djiz', 'жиззах'],
		['qashqadaryo', 'kashkadarya', 'кашкадарё', 'qashqa'],
		['navoiy', 'navoi', 'навои'],
		['namangan', 'наманган'],
		['samarqand', 'samarkand', 'самарканд'],
		['surxondaryo', 'surkhandarya', 'сурхондарё'],
		['sirdaryo', 'syrdarya', 'сирдарё'],
		['farg', 'fergana', 'фаргона'],
		['xorazm', 'khorezm', 'хоразм'],
		['toshkent', 'tashkent', 'тошкент']
	]

	// Helper to find which region index a text belongs to
	const getRegionPatternIndex = (text: string) => {
		if (!text) return -1
		const lower = text.toLowerCase().replace(/['"`ʼ’]/g, '').trim()
		return sortPatterns.findIndex(patterns =>
			patterns.some(p => lower.includes(p))
		)
	}

	// Helper to find API data for a map region
	const findApiRegion = (mapRegion: IRegion) => {
		if (!regions || regions.length === 0) return null

		// Get index for map region name
		const mapIndex = getRegionPatternIndex(mapRegion.name)
		if (mapIndex === -1) return null

		return regions.find(r => {
			const apiIndex = getRegionPatternIndex((r.hudud_uz || r.hudud || '') + ' ' + (r.name || ''))
			return apiIndex === mapIndex
		}) || null
	}

	const handleClickRegion = (region: IRegion) => {
		setCurRegion(region)
		if (handleClick) handleClick(region.id)
	}

	const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
		const bounds = e.currentTarget.getBoundingClientRect()
		setTooltipPosition({
			x: e.clientX - bounds.left,
			y: e.clientY - bounds.top,
		})
	}

	const getLocalizedContent = (apiData: RegionApiData | null, fallbackRegion: IRegion, field: 'title' | 'person') => {
		if (!apiData) {
			// Fallback to static data if no API data matches
			return fallbackRegion[field]
		}

		if (field === 'title') {
			// API field is 'hudud'
			if (locale === 'ru') return apiData.hudud_ru || apiData.hudud
			if (locale === 'oz') return apiData.hudud_uz || apiData.hudud_ru || apiData.hudud
			return apiData.hudud_uz || apiData.hudud
		}

		if (field === 'person') {
			// API field is 'name'
			if (locale === 'ru') return apiData.name_ru || apiData.name
			if (locale === 'oz') return apiData.name_uz || apiData.name_ru || apiData.name
			return apiData.name_uz || apiData.name
		}

		return ''
	}

	/**
	 * Helper to get full image URL
	 * Converts http:// to https:// for proper image loading
	 */
	const getImageUrl = (imagePath: string | undefined) => {
		if (!imagePath) return ''

		let url = ''

		// If image has http:// (from API), convert to https://
		if (imagePath.startsWith('http://')) {
			url = imagePath.replace('http://', 'https://')
		}
		// If image already has https://, use as is
		else if (imagePath.startsWith('https://')) {
			url = imagePath
		}
		// If image is relative path, prepend server URL
		else {
			url = `${process.env.NEXT_PUBLIC_SERVER || 'https://uzfk.uz'}${imagePath}`
		}

		// Add cache-busting parameter to force browser to reload images
		// This ensures we always get the latest image from backend
		const cacheBuster = `?v=${Date.now()}`
		return url + cacheBuster
	}

	const getImage = (apiData: RegionApiData | null, fallbackRegion: IRegion) => {
		const imageUrl = apiData?.image || fallbackRegion.image
		return getImageUrl(imageUrl)
	}

	const renderRegion = (region: IRegion) => {
		const { id, name, path } = region
		const isCurrentRegion = curRegion.id === region.id
		const isHovered = hoveredRegion?.id === id

		return (
			<path
				d={path}
				key={id}
				name={name}
				onClick={() => handleClickRegion(region)}
				onMouseEnter={() => {
					setHoveredRegion(region)
					setHoveredApiData(findApiRegion(region))
				}}
				onMouseLeave={() => {
					setHoveredRegion(null)
					setHoveredApiData(null)
				}}
				onMouseMove={handleMouseMove}
				style={{
					...selectedStyle,
					cursor: 'pointer',
					transition: 'all 0.3s ease',
					stroke: '#4B5563',
					strokeWidth: isHovered || isCurrentRegion ? 2 : 1,
				}}
				fill={
					isCurrentRegion
						? selectedFillColor
						: isHovered
							? '#00915c'
							: defaultFillColor
				}
			/>
		)
	}

	return (
		<div className='w-full mx-auto p-4 relative'>
			<div className='relative'>
				<svg
					viewBox='0 0 1000 700'
					className='w-full h-full'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					xmlns='http://www.w3.org/2000/svg'
					{...props}
				>
					{regionsPathArray.map(renderRegion)}
				</svg>

				{hoveredRegion && (
					<div
						className='absolute bg-white p-1 md:p-4 rounded-lg shadow-lg border border-gray-200 z-50 pointer-events-none'
						style={{
							left: `${tooltipPosition.x + 10}px`,
							top: `${tooltipPosition.y + 10}px`,
							transform: 'translate(-0%, -100%)',
							minWidth: '200px'
						}}
					>
						<div className='space-y-1 text-sm'>
							<p>
								<span className='font-medium text-black'></span>{' '}
								<span className='text-blue-600 font-bold text-[10px] md:text-sm block mb-2'>
									{getLocalizedContent(hoveredApiData, hoveredRegion, 'title')}
								</span>
							</p>
							<div className='flex items-center'>
								<div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden border border-gray-200">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={getImage(hoveredApiData, hoveredRegion)}
										alt='Hudud rasmi'
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='ml-2'>
									<p>
										<span className='font-medium text-black'></span>{' '}
										<span className='text-black font-bold text-[12px] md:text-sm block leading-tight'>
											{getLocalizedContent(hoveredApiData, hoveredRegion, 'person')}
										</span>
									</p>
									{hoveredApiData?.address && (
										<p className='mt-1 text-[10px] text-gray-500 leading-tight'>
											{hoveredApiData.address}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
