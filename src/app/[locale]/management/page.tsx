'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
interface Worker {
	id: number
	f_name_uz: string
	f_name_ru: string
	f_name_en: string
	image: string
	phone: string
	email: string
	section: {
		id: number
		name_uz: string
		name_ru: string
		name_en: string
	}
	position: {
		id: number
		name_uz: string
		name_ru: string
		name_en: string
	}
	address: string
	biography: string
	obligation: string
	workers?: Worker[] // Optional nested workers
	currentTab?: 'biography' | 'obligation' | 'workers' | null // Added to track each worker's currentTab
}

export default function Page() {
	const [workers, setWorkers] = useState<Worker[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 100
	const t = useTranslations()
	const pathname = usePathname()
	const language = pathname.startsWith('/ru')
		? 'ru'
		: pathname.startsWith('/oz')
		? 'oz'
		: 'uz'

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}/uz/api/workers/list/`
				)
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const data = await res.json()
				// Add default currentTab for each worker
				const updatedWorkers = data.results.map((worker: Worker) => ({
					...worker,
					currentTab: null, // Default tab
				}))
				setWorkers(updatedWorkers)
			} catch (err: unknown) {
				const errorMessage =
					err instanceof Error
						? `Маълумотлар юкланишида хатолик: ${err.message}`
						: 'Маълумотлар юкланишида хатолик'
				setError(errorMessage)
				console.error('Error fetching workers data:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleTabChange = (
		workerId: number,
		tab: 'biography' | 'obligation' | 'workers'
	) => {
		setWorkers(prevWorkers =>
			prevWorkers.map(worker =>
				worker.id === workerId ? { ...worker, currentTab: tab } : worker
			)
		)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const paginatedWorkers: Worker[] = workers.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)
	// Tilga qarab title va description tanlash
	const fname =
		language === 'ru'
			? paginatedWorkers.map(item => item.f_name_ru)
			: paginatedWorkers.map(item => item.f_name_uz)
	const section =
		language === 'ru'
			? paginatedWorkers.map(item => item.section.name_ru)
			: paginatedWorkers.map(item => item.section.name_uz)

	if (isLoading) {
		return (
			<div className='px-5 py-12 mx-auto'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='text-center text-red-500'>
					<p>{error}</p>
				</div>
			</div>
		)
	}

	return (
		<section className='bg-[#f8f9fa] dark:bg-gray-600 body-font'>
			<div className='container px-2 md:px-9 py-4 mx-auto'>
				<Link
					href={'/structure'}
					className='text-2xl flex gap-1 items-center group font-medium text-blue-600 dark:text-blue-500'
				>
					{t('nav5')}
					<ArrowRight className='group-hover:translate-x-1 transition-all' />
				</Link>
				<div className='grid grid-cols-1 mt-4 gap-1'>
					{paginatedWorkers.map(worker => {
						const fname =
							language === 'ru'
								? worker.f_name_ru
								: language === 'oz'
								? worker.f_name_en
								: worker.f_name_uz
						const section =
							language === 'ru'
								? worker.section.name_ru
								: language === 'oz'
								? worker.section.name_en
								: worker.section.name_uz

						const position =
							language === 'ru'
								? worker.position.name_ru
								: language === 'oz'
								? worker.position.name_en
								: worker.position.name_uz

						return (
							<div
								key={worker.id}
								className='border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-500 transition-all transform hover:shadow-xl p-1 md:p-6'
							>
								{/* Worker Image and Info */}
								<div className='flex flex-col md:flex-row gap-6 items-start'>
									{/* Worker Image */}
									<div className='h-auto'>
										<img
											src={worker.image}
											alt={worker.f_name_uz}
											className='w-full border h-60 object-cover rounded-lg'
										/>
									</div>

									{/* Worker Info */}
									<div className='flex flex-col gap-1'>
										<h3 className='text-sm flex flex-wrap md:text-3xl font-semibold text-gray-900 mb-4'>
											{fname}
										</h3>
										{/* <p className='text-blue-600 dark:text-white font-medium text-lg mb-2'>
											<b className='text-black max-md:text-sm'>
												{t('lavozim')}:
											</b>{' '}
											{position}
										</p> */}
										<p className='text-blue-600 dark:text-white font-medium text-lg mb-2'>
											{/* <b className='text-black max-md:text-sm'>{t('bolm')}:</b>{' '} */}
											{section}
										</p>
										<p className='text-blue-600 dark:text-white font-medium text-lg mb-2'>
											<b className='text-black max-md:text-sm'>{t('tel')}:</b>{' '}
											{worker.phone}
										</p>
										<p className='text-blue-600 dark:text-white font-medium text-lg'>
											<b className='text-black max-md:text-sm'>{t('mail')}:</b>{' '}
											{worker.email}
										</p>
										<p className='text-blue-600 dark:text-white font-medium text-lg'>
											<b className='text-black max-md:text-sm'>
												{t('address')}:
											</b>{' '}
											{worker.address}
										</p>
									</div>
								</div>

								{/* Tabs */}
								<div className='mt-6 border-t pt-4'>
									<div className='flex max-md:flex-col max-md:gap-2 max-md:items-center justify-start md:space-x-2'>
										{['biography'].map(tab => (
											<button
												key={tab}
												className={`px-8 py-2 max-md:w-full text-lg font-bold transition-colors duration-300 rounded-sm ${
													worker.currentTab === tab
														? 'bg-blue-500 text-white'
														: 'bg-gray-200 text-gray-700'
												}`}
												onClick={() => handleTabChange(worker.id, tab as any)}
											>
												{tab === 'biography' && `${t('bio')}`}
												{tab === 'obligation' && `${t('obl')}`}
												{tab === 'workers' && `${t('work')}`}
											</button>
										))}
									</div>

									{/* Tab Content */}
									<div className='mt-6'>
										{worker.currentTab === 'biography' && (
											<p
												className='text-blue-600 font-medium space-y-1 text-base'
												dangerouslySetInnerHTML={{ __html: worker.biography }}
											/>
										)}
										{worker.currentTab === 'obligation' && (
											<p
												className='text-blue-600 font-medium space-y-1 text-base'
												dangerouslySetInnerHTML={{ __html: worker.obligation }}
											/>
										)}
										{worker.currentTab === 'workers' && worker.workers && (
											<div className='mt-6 space-y-4'>
												{worker.workers.map(subWorker => (
													<div
														key={subWorker.id}
														className='flex max-md:flex-col gap-6 border rounded-lg p-6 shadow-md bg-gray-50'
													>
														<img
															src={subWorker.image}
															alt={subWorker.f_name_uz}
															className='w-[200px] h-60 rounded-lg object-cover'
														/>
														<div className='flex flex-col gap-4'>
															<h4 className='text-xl font-semibold text-gray-900'>
																{subWorker.f_name_uz}
															</h4>
															<p className='text-base text-blue-600'>
																<b>Lavozimi:</b> {subWorker.position.name_uz}
															</p>
															<p className='text-base text-blue-600'>
																<b>Telefon:</b> {subWorker.phone}
															</p>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
