'use client'

import { FC, useState, SVGProps, CSSProperties } from 'react'
import Image from 'next/image'
import { IRegion, regionsPathArray } from './map-array'

interface RegionsMapProps extends SVGProps<SVGSVGElement> {
	defaultFillColor?: string
	selectedFillColor?: string
	selectedStyle?: CSSProperties
	handleClick?: (regionId: string) => void
}

export const RegionsMap: FC<RegionsMapProps> = ({
	defaultFillColor = '#ebb77a', // Yer rangi uchun och rang
	selectedFillColor = '#078D3A', // Tanlangan hudud uchun to‘q yashil rang
	selectedStyle = {},
	handleClick,
	...props
}) => {
	const [curRegion, setCurRegion] = useState(
		regionsPathArray[regionsPathArray.length - 1]
	)

	const [hoveredRegion, setHoveredRegion] = useState<IRegion | null>(null)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

	const handleClickRegion = (region: IRegion) => {
		setCurRegion(region)
		if (handleClick) handleClick(region.id)
	}

	const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
		const bounds = e.currentTarget.getBoundingClientRect()
		setTooltipPosition({
			x: e.clientX - bounds.left, // Harita ichidagi joylashuv
			y: e.clientY - bounds.top,
		})
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
				onMouseEnter={() => setHoveredRegion(region)}
				onMouseLeave={() => setHoveredRegion(null)}
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
							? '#00915c' // Hover holati uchun to‘q yashil rang
							: defaultFillColor
				}
			/>
		)
	}

	return (
		<div className='w-full max-w-2xl mx-auto p-4 relative'>
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
						className='absolute bg-white p-1 md:p-4 rounded-lg shadow-lg border border-gray-200 z-50'
						style={{
							left: `${tooltipPosition.x + 10}px`,
							top: `${tooltipPosition.y + 10}px`,
							transform: 'translate(-0%, -100%)',
						}}
					>
						<div className='space-y-1 text-sm'>
							<p>
								<span className='font-medium text-black'></span>{' '}
								<span className='text-blue-600 font-bold text-[10px] md:text-sm'>
									{hoveredRegion.title}
								</span>
							</p>
							<div className='flex'>
								<Image
									src={hoveredRegion.image}
									alt='Hudud rasmi'
									width={56}
									height={56}
									className='w-14 h-14 object-cover rounded'
								/>
								<p className='ml-2'>
									<span className='font-medium text-black'></span>{' '}
									<span className='text-black font-bold text-[12px] md:text-sm'>
										{hoveredRegion.person}
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
