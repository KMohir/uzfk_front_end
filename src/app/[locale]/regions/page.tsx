'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
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
	// Added fields from LocalCouncil
	phone?: string
	email?: string
	address?: string
	council_title?: string
}

interface LocalCouncil {
	id: number
	name: string
	region: string
	title: string
	phone: string
	email: string
	address: string
}

interface TuzilmaWorker {
	id: number
	position_text: string
	section: {
		name: string
	}
	f_name: string
	f_name_uz: string
	f_name_ru: string
	f_name_en: string
	image: string
	email: string
	phone: string
}

export default function RegionsPage() {
	const t = useTranslations()
	const locale = useLocale()
	const [regions, setRegions] = useState<Region[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch APIs in parallel: Map, Local Council, and Tuzilma (for images)
				// Tuzilma has the real photos and is currently working on prod
				const [mapResponse, councilResponse, tuzilmaResponse] = await Promise.all([
					fetch(`${process.env.NEXT_PUBLIC_SERVER}/ru/api/interactive-map/list/`),
					fetch(`${process.env.NEXT_PUBLIC_SERVER}/ru/api/local-council/list/`),
					fetch(`${process.env.NEXT_PUBLIC_SERVER}/ru/api/tuzilma/list/`)
				])

				if (!mapResponse.ok) throw new Error('Failed to fetch map data')

				const mapData = await mapResponse.json()
				// Handle 404 or errors gracefully for auxiliary APIs
				const councilData = councilResponse.ok ? await councilResponse.json() : { results: [] }
				const tuzilmaData = tuzilmaResponse.ok ? await tuzilmaResponse.json() : { results: [] }

				console.log('Map Data:', mapData)
				console.log('Council Data:', councilData)
				console.log('Tuzilma Data:', tuzilmaData)

				const mapRegions: Region[] = mapData.results || []
				const councils: LocalCouncil[] = councilData.results || []
				const tuzilmaWorkers: TuzilmaWorker[] = tuzilmaData.results || []

				// Deduplicate map regions
				const uniqueRegions = mapRegions.filter((region, index, self) =>
					index === self.findIndex((r) => r.id === region.id)
				)

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

				// Merge logic
				const mergedRegions = uniqueRegions.map(region => {
					// Identify the region index for this map region
					const regionIndex = getRegionPatternIndex(
						[region.hudud, region.hudud_uz, region.name].join(' ')
					)

					if (regionIndex === -1) return region

					// 1. Find Council Data
					const councilMatch = councils.find(council => {
						const councilIndex = getRegionPatternIndex(council.region + ' ' + council.name)
						return councilIndex === regionIndex
					})

					// 2. Find Tuzilma Data
					const tuzilmaMatch = tuzilmaWorkers.find(worker => {
						// Check position text for region name
						const posIndex = getRegionPatternIndex(worker.position_text)
						// Check section name for region name
						const sectionIndex = getRegionPatternIndex(worker.section?.name)

						return posIndex === regionIndex || sectionIndex === regionIndex
					})

					let merged = { ...region }

					// Apply Council Data
					if (councilMatch) {
						merged = {
							...merged,
							phone: councilMatch.phone || merged.phone,
							email: councilMatch.email || merged.email,
							address: councilMatch.address || merged.address,
							council_title: councilMatch.title
						}
					}

					// Apply Tuzilma Data (Priority for Image and Name)
					if (tuzilmaMatch) {
						merged = {
							...merged,
							// Use Tuzilma image if available
							image: tuzilmaMatch.image || merged.image,
							// Ensure we use the best name available. Tuzilma names are from HR DB.
							name: tuzilmaMatch.f_name || merged.name,
							name_uz: tuzilmaMatch.f_name_uz || merged.name_uz,
							name_ru: tuzilmaMatch.f_name_ru || merged.name_ru,
							name_en: tuzilmaMatch.f_name_en || merged.name_en,
							// Tuzilma might have contacts too?
							email: tuzilmaMatch.email || merged.email,
							// Tuzilma phone is often null but check it
							phone: tuzilmaMatch.phone || merged.phone
						}
					}

					return merged
				})


				const getSortIndex = (region: Region) => {
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

				const sortedRegions = mergedRegions.sort((a, b) => {
					const indexA = getSortIndex(a)
					const indexB = getSortIndex(b)

					if (indexA !== -1 && indexB !== -1) return indexA - indexB
					if (indexA !== -1) return -1
					if (indexB !== -1) return 1

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

		fetchData()
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

		// Add cache-busting parameter
		const cacheBuster = `?v=${Date.now()}`
		return url + cacheBuster
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
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6'>
						{regions.map((region) => (
							<div
								key={region.id}
								className='bg-white dark:bg-gray-500 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col md:flex-row'
							>
								{/* Image Section */}
								<div className='md:w-1/3 h-64 md:h-auto relative'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={getImageUrl(region.image)}
										alt={getPersonName(region) || 'Region'}
										className='object-cover w-full h-full'
									/>
								</div>

								{/* Content Section */}
								<div className='p-6 md:w-2/3 flex flex-col justify-center'>
									<h3 className='text-xl font-bold text-green-700 dark:text-white mb-2'>
										{getRegionName(region)}
									</h3>

									<div className='mb-4'>
										<h4 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
											{getPersonName(region)}
										</h4>
										<p className='text-sm text-gray-500 dark:text-gray-300'>
											{getPosition(region)}
										</p>
									</div>

									<div className='space-y-2 mt-2 border-t pt-4 border-gray-100 dark:border-gray-400'>
										{region.phone && (
											<p className='text-sm text-blue-600 dark:text-blue-300'>
												<span className='font-bold text-gray-700 dark:text-gray-200 block md:inline md:mr-2'>{t('tel')}:</span>
												{region.phone}
											</p>
										)}
										{region.email && (
											<p className='text-sm text-blue-600 dark:text-blue-300'>
												<span className='font-bold text-gray-700 dark:text-gray-200 block md:inline md:mr-2'>{t('mail')}:</span>
												{region.email}
											</p>
										)}
										{region.address && (
											<p className='text-sm text-gray-600 dark:text-gray-300'>
												<span className='font-bold text-gray-700 dark:text-gray-200 block md:inline md:mr-2'>{t('address')}:</span>
												{region.address}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
