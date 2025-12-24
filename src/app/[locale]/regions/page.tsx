'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { RegionsMap } from '../(home)/_components/map'

interface Region {
	id: string
	name_uz: string
	name_oz: string
	name_ru: string
	title_uz: string
	title_oz: string
	title_ru: string
	person: string
	image: string
}

const regionsData: Region[] = [
	{
		id: 'UZB356',
		name_uz: "Qoraqalpog'iston",
		name_oz: "Қорақалпоғистон",
		name_ru: "Каракалпакстан",
		title_uz: "Qoraqalpog'iston fermerlari Kengashi raisi",
		title_oz: "Қорақалпоғистон фермерлари Кенгаши раиси",
		title_ru: "Председатель Совета фермеров Каракалпакстана",
		person: 'YUNUSOV ILXAMBAY KUCHKAROVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB355',
		name_uz: 'Xorazm',
		name_oz: 'Хоразм',
		name_ru: 'Хорезм',
		title_uz: 'Xorazm viloyat fermerlari Kengashi raisi',
		title_oz: 'Хоразм вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Хорезмской области',
		person: 'RAJABOV QACHRAMON SATIMBAEVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB354',
		name_uz: 'Buxoro',
		name_oz: 'Бухоро',
		name_ru: 'Бухара',
		title_uz: 'Buxoro viloyat fermerlari Kengashi raisi',
		title_oz: 'Бухоро вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Бухарской области',
		person: 'Boltaev Xurshid Xomitovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB357',
		name_uz: 'Navoiy',
		name_oz: 'Навоий',
		name_ru: 'Навои',
		title_uz: 'Navoiy viloyat fermerlari Kengashi raisi',
		title_oz: 'Навоий вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Навоийской области',
		person: 'YARLAKABOV SHOKIRJON ABDIKAYUMOVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB358',
		name_uz: 'Samarqand',
		name_oz: 'Самарқанд',
		name_ru: 'Самарканд',
		title_uz: 'Samarqand viloyat fermerlari Kengashi raisi',
		title_oz: 'Самарқанд вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Самаркандской области',
		person: "Rabbimov Abror Mehriddin o'g'li",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB361',
		name_uz: 'Qashqadaryo',
		name_oz: 'Қашқадарё',
		name_ru: 'Кашкадарья',
		title_uz: 'Qashqadaryo viloyat fermerlari Kengashi raisi',
		title_oz: 'Қашқадарё вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Кашкадарьинской области',
		person: 'Abdinazarov Jahongir Nodirshoevich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB362',
		name_uz: 'Surxondaryo',
		name_oz: 'Сурхондарё',
		name_ru: 'Сурхандарья',
		title_uz: 'Surxondaryo viloyat fermerlari Kengashi raisi',
		title_oz: 'Сурхондарё вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Сурхандарьинской области',
		person: 'Murodov Muxiddin Nazarovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB370',
		name_uz: 'Jizzax',
		name_oz: 'Жиззах',
		name_ru: 'Джизак',
		title_uz: 'Jizzax viloyat fermerlari Kengashi raisi',
		title_oz: 'Жиззах вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Джизакской области',
		person: 'Eshmatov Anarboy Abbosovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB371',
		name_uz: 'Sirdaryo',
		name_oz: 'Сирдарё',
		name_ru: 'Сырдарья',
		title_uz: 'Sirdaryo viloyat fermerlari Kengashi raisi',
		title_oz: 'Сирдарё вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Сырдарьинской области',
		person: "Primqulov Ro'ziqul Ummatqulovich",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB372',
		name_uz: 'Toshkent viloyati',
		name_oz: 'Тошкент вилояти',
		name_ru: 'Ташкентская область',
		title_uz: 'Toshkent viloyat fermerlari Kengashi raisi',
		title_oz: 'Тошкент вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Ташкентской области',
		person: "Do'sbekov Shuxrat Begimqulovich",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB363',
		name_uz: 'Andijon',
		name_oz: 'Андижон',
		name_ru: 'Андижан',
		title_uz: 'Andijon viloyat fermerlari Kengashi raisi',
		title_oz: 'Андижон вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Андижанской области',
		person: 'Nabijanov Farhod Isroilovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB364',
		name_uz: "Farg'ona",
		name_oz: "Фарғона",
		name_ru: "Фергана",
		title_uz: "Farg'ona viloyat fermerlari Kengashi raisi",
		title_oz: "Фарғона вилоят фермерлари Кенгаши раиси",
		title_ru: "Председатель Совета фермеров Ферганской области",
		person: 'Maxmudov Nodirjon Shoxobidinovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB365',
		name_uz: 'Namangan',
		name_oz: 'Наманган',
		name_ru: 'Наманган',
		title_uz: 'Namangan viloyat fermerlari Kengashi raisi',
		title_oz: 'Наманган вилоят фермерлари Кенгаши раиси',
		title_ru: 'Председатель Совета фермеров Наманганской области',
		person: 'Kaimov Nosirjon Zakirjonovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
]

export default function RegionsPage() {
	const t = useTranslations()
	const locale = useLocale()
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

	const getRegionName = (region: Region) => {
		if (locale === 'ru') return region.name_ru
		if (locale === 'oz') return region.name_oz
		return region.name_uz
	}

	const getRegionTitle = (region: Region) => {
		if (locale === 'ru') return region.title_ru
		if (locale === 'oz') return region.title_oz
		return region.title_uz
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
						<RegionsMap />
					</div>
				</div>

				{/* Regions Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{regionsData.map((region) => (
						<div
							key={region.id}
							className={`bg-white dark:bg-gray-500 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 ${
								selectedRegion?.id === region.id
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
											alt={region.person}
											fill
											className='object-cover'
										/>
									</div>
									<div>
										<h3 className='text-lg font-bold text-green-700 dark:text-white'>
											{getRegionName(region)}
										</h3>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											{region.person}
										</p>
									</div>
								</div>
								<p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
									{getRegionTitle(region)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
