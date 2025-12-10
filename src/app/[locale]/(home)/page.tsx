/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from 'react'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Announcements from './_components/announcements'
import { CalendarDemo } from './_components/calendar'
import { RegionsMap } from './_components/map'
import CardLinks from './_components/perexod'
import Videos from './_components/videos'

interface News {
	id: number
	title: string
	subtitle: string
	image: string
	slug: string
	created_at: string
}

export default function Page() {
	const t = useTranslations()
	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/ru/api/news/list/`)
			.then(res => res.json())
			.then(data => {
				setNews(data.results) // Faqat "results" massivini olish
				setLoading(false)
			})
			.catch(err => {
				console.error('Malumotlar yuklanishida xatolik', err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	const mainNews = news[0]
	const otherNews = news.slice(1, 4)

	return (
		<div>
			<div className='w-full mx-auto mt-10 flex flex-col gap-14 bg-[#ffffff] dark:bg-gray-600'>
				<div className='flex flex-col rounded-lg px-10'>
					<h2 className='text-2xl font-bold text-blue-600 mb-4 dark:text-white mt-2 max-md:text-'>
						<Link href={'/news'}>{t('news')}</Link>
					</h2>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Asosiy yangilik */}
						<div className='lg:col-span-2'>
							<Link href={`/news/${mainNews.slug}`}>
								<div className='bg-white dark:bg-gray-500 dark:text-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow  h-full dark:hover:shadow-2xl group'>
									<div className='relative h-28 md:h-[360px]'>
										<Image
											fill
											src={mainNews.image}
											alt={mainNews.title}
											className='object-cover md:h-[380px]'
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-base md:text-2xl font-medium mb-2 text-blue-600 group-hover:text-green-500 dark:text-white'>
											{mainNews.title.slice(0, 50) + '...'}
										</h3>

										<div className='text-sm text-gray-500'>
											<span className='text-gray-500 font-medium dark:text-white'>
												📅{' '}
												{new Date(mainNews.created_at)
													.toLocaleDateString('uz-UZ', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
													.replace(/\./g, '/')}
											</span>
										</div>
									</div>
								</div>
							</Link>
						</div>

						{/* O'ng tomondagi kichik yangiliklar */}
						<div className='h-full'>
							{otherNews.slice(1, 2).map(news => (
								<Link
									key={news.id}
									href={`/news/${news.slug}`}
									className='block'
								>
									<div className='bg-white  dark:bg-gray-500 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow h-full group'>
										<div className='relative h-28 md:h-[360px]'>
											<Image
												src={news.image}
												alt={news.title}
												fill
												className='object-cover'
											/>
										</div>
										<div className='p-6'>
											<h3 className='text-base md:text-xl font-semibold mb-2 text-blue-600 group-hover:text-green-500 dark:text-white'>
												{news.title.slice(0, 50) + '...'}
											</h3>
											<span className='text-gray-500 dark:text-white font-medium'>
												📅{' '}
												{new Date(news.created_at)
													.toLocaleDateString('uz-UZ', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
													.replace(/\./g, '/')}
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* Pastdagi kichik yangiliklar */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
						{otherNews.slice(0).map(news => (
							<Link
								key={news.id}
								href={`/news/${news.slug}`}
								className='block h-full'
							>
								<div className='bg-white dark:bg-gray-500 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow h-full pb-2 group '>
									<div className='relative h-28 md:h-[400px]'>
										<Image
											src={news.image}
											alt={news.title}
											fill
											className='object-cover'
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-base md:text-xl font-semibold mb-2 text-blue-600 gtoup group-hover:text-green-500 dark:text-white'>
											{news.title.slice(0, 50) + '...'}
										</h3>
										<span className='text-gray-500 dark:text-white font-medium absolute pb-2'>
											📅{' '}
											{new Date(news.created_at)
												.toLocaleDateString('uz-UZ', {
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
												})
												.replace(/\./g, '/')}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
					<Link
						href='/news'
						className='text-blue-600 font-medium group text-xl transition-all hover:underline mt-4 flex items-center dark:text-green-500'
					>
						{t('allNew')}
						<ArrowRight className='size-4 group-hover:translate-x-1 transition-all' />
					</Link>
				</div>

				<div className='px-10'>
					<h2 className='text-2xl font-bold text-blue-600 mb-4 ml-1 dark:text-white'>
						<Link href={'/announcements'}>{t('announcements')}</Link>
					</h2>
					<Announcements />
					<Link
						href='/announcements'
						className='text-blue-600 font-medium text-xl group transition-all hover:underline mt-4 flex items-center dark:text-green-500'
					>
						{t('allAnn')}
						<ArrowRight className='size-4 group-hover:translate-x-1 transition-all' />
					</Link>
					<div className='mt-2'></div>
				</div>

				<div className='px-10'>
					<h2 className='text-2xl font-bold text-blue-600 mb-4 dark:text-white'>
						{t('videos')}
					</h2>
					<Videos />
					<Link
						href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
						className='text-blue-600 text-xl  font-medium group transition-all hover:underline mt-4 flex items-center dark:text-green-500'
					>
						{t('allVideo')}
						<ArrowRight className='size-4 group-hover:translate-x-1 transition-all' />
					</Link>
					<div className='mt-2'></div>
				</div>
			</div>

			<div className='container mx-auto grid grid-cols-[3fr_2fr] max-lg:grid-cols-1 items-center px-4 md:px-10 dark:bg-gray-600 bg-[#ffffff]'>
				{/* Chap ustun (Map) */}
				<div className='w-full flex justify-center mt-10'>
					<RegionsMap />
				</div>

				{/* O'ng ustun (Calendar) */}
				<div className='flex flex-col items-center w-full absolut'>
					<div className='w-full flex justify-center max-md:ml-0 ml-6'>
						<CalendarDemo />
					</div>
				</div>
			</div>

			<div className='px-6'>
				<CardLinks />
			</div>
		</div>
	)
}
