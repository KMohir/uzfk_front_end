'use client'

import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

function Language(): JSX.Element {
	const router = useRouter()
	const [selectedLang, setSelectedLang] = useState<string>('oz') // Default til

	// URL'dagi tilni aniqlab, dropdownni to'g'ri qiymatga o'rnatish
	useEffect(() => {
		const currentPath = window.location.pathname
		const matchedLang = currentPath.match(/^\/(ru|uz|oz)/) // URL boshida tilni qidirish
		if (matchedLang) {
			setSelectedLang(matchedLang[1]) // Tildan keyingi qiymatni o'rnatish
		}
	}, [])

	const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
		const newLang = e.target.value
		setSelectedLang(newLang)

		// Sahifa yo'nalishini o'zgartirish
		const currentPath = window.location.pathname
		const newPath = currentPath.replace(/^\/(ru|uz|oz)/, `/${newLang}`) // Tilni almashtirish
		router.push(newPath) // Yangi tilga yo'naltirish
	}

	return (
		<div className='relative inline-block text-left'>
			<div className='relative inline-block'>
				<select
					value={selectedLang}
					onChange={handleLanguageChange}
					className='appearance-none py-0.5 pr-5 pl-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white'
				>
					<option value='ru'>RU</option>
					<option value='uz'>UZ</option>
					<option value='oz'>Ўз</option>
				</select>
				<div className='absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none'>
					<ChevronDown className='size-4' />
				</div>
			</div>
		</div>
	)
}

export default Language
