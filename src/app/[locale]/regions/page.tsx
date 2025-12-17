'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { RegionsMap } from '../(home)/_components/map'

interface Region {
	id: string
	name: string
	title: string
	person: string
	image: string
}

const regionsData: Region[] = [
	{
		id: 'UZB356',
		name: "Qoraqalpog'iston",
		title: "Qoraqalpog'iston fermerlari Kengashi raisi",
		person: 'YUNUSOV ILXAMBAY KUCHKAROVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB355',
		name: 'Xorazm',
		title: 'Xorazm viloyat fermerlari Kengashi raisi',
		person: 'RAJABOV QACHRAMON SATIMBAEVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB354',
		name: 'Buxoro',
		title: 'Buxoro viloyat fermerlari Kengashi raisi',
		person: 'Boltaev Xurshid Xomitovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB357',
		name: 'Navoiy',
		title: 'Navoiy viloyat fermerlari Kengashi raisi',
		person: 'YARLAKABOV SHOKIRJON ABDIKAYUMOVICH',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB358',
		name: 'Samarqand',
		title: 'Samarqand viloyat fermerlari Kengashi raisi',
		person: "Rabbimov Abror Mehriddin o'g'li",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB361',
		name: 'Qashqadaryo',
		title: 'Qashqadaryo viloyat fermerlari Kengashi raisi',
		person: 'Abdinazarov Jahongir Nodirshoevich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB362',
		name: 'Surxondaryo',
		title: 'Surxondaryo viloyat fermerlari Kengashi raisi',
		person: 'Murodov Muxiddin Nazarovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB370',
		name: 'Jizzax',
		title: 'Jizzax viloyat fermerlari Kengashi raisi',
		person: 'Eshmatov Anarboy Abbosovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB371',
		name: 'Sirdaryo',
		title: 'Sirdaryo viloyat fermerlari Kengashi raisi',
		person: "Primqulov Ro'ziqul Ummatqulovich",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB372',
		name: 'Toshkent viloyati',
		title: 'Toshkent viloyat fermerlari Kengashi raisi',
		person: "Do'sbekov Shuxrat Begimqulovich",
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB363',
		name: 'Andijon',
		title: 'Andijon viloyat fermerlari Kengashi raisi',
		person: 'Nabijanov Farhod Isroilovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB364',
		name: "Farg'ona",
		title: "Farg'ona viloyat fermerlari Kengashi raisi",
		person: 'Maxmudov Nodirjon Shoxobidinovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
	{
		id: 'UZB365',
		name: 'Namangan',
		title: 'Namangan viloyat fermerlari Kengashi raisi',
		person: 'Kaimov Nosirjon Zakirjonovich',
		image: 'https://uzfk.uz/media/adminstration_card/image_2025-01-23_15-48-46.png',
	},
]

export default function RegionsPage() {
	const t = useTranslations()
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

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
											{region.name}
										</h3>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											{region.person}
										</p>
									</div>
								</div>
								<p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
									{region.title}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
