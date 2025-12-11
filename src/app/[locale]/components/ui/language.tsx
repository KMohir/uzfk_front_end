'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface LanguageProps {
	scrolled?: boolean
}

function Language({ scrolled = false }: LanguageProps) {
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

	const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
					className={`appearance-none cursor-pointer py-1 pr-8 pl-3 border rounded-lg font-medium focus:outline-none focus:ring-2 backdrop-blur-sm transition-all [&>option]:bg-white [&>option]:text-gray-900 ${scrolled
						? 'border-gray-300 bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 focus:ring-gray-400'
						: 'border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-white/50'
						}`}
				>
					<option value='ru'>RU</option>
					<option value='uz'>UZ</option>
					<option value='oz'>Ўз</option>
				</select>
				<div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${scrolled ? 'text-gray-600' : 'text-white'}`}>
					<ChevronDown className='size-4' />
				</div>
			</div>
		</div>
	)
}

export default Language
