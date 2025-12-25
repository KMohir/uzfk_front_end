'use client'

import { FC, useState, SVGProps, CSSProperties } from 'react'
import Image from 'next/image'
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

	// Helper to find API data for a map region
	const findApiRegion = (mapRegion: IRegion) => {
		if (!regions || regions.length === 0) return null
		// Normalize names for comparison
		const normalize = (s: string) => s.toLowerCase().replace(/['`"ʻʼ]/g, '').trim()
		const mapName = normalize(mapRegion.name)

		return regions.find(r => {
			const apiNameUz = normalize(r.hudud_uz || '')
			const apiNameRu = normalize(r.hudud_ru || '')
			// Check if API region name includes the map region name (e.g. "Buxoro viloyati..." includes "Buxoro")
			return apiNameUz.includes(mapName) || apiNameRu.includes(mapName)
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

	const getImage = (apiData: RegionApiData | null, fallbackRegion: IRegion) => {
		return apiData?.image || fallbackRegion.image
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
								<div className="relative w-14 h-14 flex-shrink-0">
									<Image
										src={getImage(hoveredApiData, hoveredRegion)}
										alt='Hudud rasmi'
										fill
										className='object-cover rounded border border-gray-200'
									/>
								</div>
								<p className='ml-2'>
									<span className='font-medium text-black'></span>{' '}
									<span className='text-black font-bold text-[12px] md:text-sm block leading-tight'>
										{getLocalizedContent(hoveredApiData, hoveredRegion, 'person')}
									</span>
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
