'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { RegionsMap } from '../(home)/_components/map'

interface Region {
	id: number
	hudud: string
	hudud_uz: string
	hudud_oz: string
	hudud_ru: string
	hudud_en: string
	name: string
	name_uz: string
	name_oz: string
	name_ru: string
	name_en: string
	position: string
	position_uz: string
	position_oz: string
	position_ru: string
	position_en: string
	image: string
}

export default function RegionsPage() {
	const t = useTranslations()
	const locale = useLocale()
	const [regions, setRegions] = useState<Region[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

	useEffect(() => {
		const fetchRegions = async () => {
			try {
				// Barcha tillar uchun ru API'sidan ma'lumot olamiz
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}/ru/api/interactive-map/list/`
				)
				if (!response.ok) {
					throw new Error('Failed to fetch regions')
				}
				const data = await response.json()
				console.log('Regions data:', data) // Debug uchun

				// Deduplicate based on ID
				const uniqueRegions = (data.results || []).filter((region: Region, index: number, self: Region[]) =>
					index === self.findIndex((r) => r.id === region.id)
				)

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

				const getSortIndex = (region: Region) => {
					// Concatenate all searchable fields to ensure we catch the keyword
					const searchStr = [
						region.hudud_uz,
						region.hudud_oz,
						region.hudud_ru,
						region.hudud_en,
						region.hudud,
						region.name
					].filter(Boolean).join(' ').toLowerCase()

					return sortPatterns.findIndex(patterns =>
						patterns.some(pattern => searchStr.includes(pattern))
					)
				}

				const sortedRegions = uniqueRegions.sort((a: Region, b: Region) => {
					const indexA = getSortIndex(a)
					const indexB = getSortIndex(b)

					// Valid items come first, sorted by index
					if (indexA !== -1 && indexB !== -1) {
						return indexA - indexB
					}
					// Items in list come before items not in list
					if (indexA !== -1) return -1
					if (indexB !== -1) return 1

					// Fallback to alphabetical for unlisted items
					const nameA = (a.hudud_uz || a.hudud || '').toLowerCase()
					const nameB = (b.hudud_uz || b.hudud || '').toLowerCase()
					return nameA.localeCompare(nameB)
				})

				setRegions(sortedRegions)
			} catch (error) {
				console.error('Error fetching regions:', error)
				setRegions([])
			} finally {
				setLoading(false)
			}
		}

		fetchRegions()
	}, [locale])

	const getRegionName = (region: Region) => {
		if (locale === 'ru' || locale === 'oz') return region.hudud_ru || region.hudud
		return region.hudud_uz || region.hudud
	}

	const getPersonName = (region: Region) => {
		if (locale === 'ru' || locale === 'oz') return region.name_ru || region.name
		return region.name_uz || region.name
	}

	const getPosition = (region: Region) => {
		if (locale === 'ru' || locale === 'oz') return region.position_ru || region.position
		return region.position_uz || region.position
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-white dark:bg-gray-600 py-24'>
				<div className='container mx-auto px-4 md:px-8'>
					<div className='text-center'>
						<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
						<p className='mt-4 text-gray-600'>Yuklanmoqda...</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-white dark:bg-gray-600 py-24'>
			<div className='container mx-auto px-4 md:px-8'>
				<h1 className='text-3xl md:text-4xl font-bold text-center mb-8 text-green-700 dark:text-white'>
					{t('nav7')}
				</h1>

				{/* Map Section */}
				<div className='mb-12 flex justify-center'>
					<div className='w-full max-w-4xl'>
						{/* We pass the fetched regions to the map */}
						<RegionsMap regions={regions} />
					</div>
				</div>

				{/* Regions Grid */}
				{regions.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-xl text-gray-500'>Ma&apos;lumotlar topilmadi</p>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{regions.map((region) => (
							<div
								key={region.id}
								className={`bg-white dark:bg-gray-500 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 ${selectedRegion?.id === region.id
									? 'border-green-500'
									: 'border-transparent'
									}`}
								onClick={() => setSelectedRegion(region)}
							>
								<div className='p-4'>
									<div className='flex items-center gap-4'>
										<div className='relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0'>
											<Image
												src={region.image}
												alt={getPersonName(region) || 'Region'}
												fill
												className='object-cover'
											/>
										</div>
										<div>
											<h3 className='text-lg font-bold text-green-700 dark:text-white'>
												{getRegionName(region)}
											</h3>
											<p className='text-sm text-gray-600 dark:text-gray-300'>
												{getPersonName(region)}
											</p>
										</div>
									</div>
									<p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
										{getPosition(region)}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
