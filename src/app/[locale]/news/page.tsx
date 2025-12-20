'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

interface News {
	id: number
	title: string
	description: string
	image: string
	date: string
	category: string
	slug: string
	content: string
	author_post: string
	created_at: string
}

interface ApiResponse {
	results: News[]
	next: string | null
	previous: string | null
	count: number
}

export default function NewsPage() {
	const locale = useLocale()
	const [news, setNews] = useState<News[]>([])

	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const newsPerPage = 12

	const apiLocale = locale === 'oz' ? 'uz' : locale
	const apiUrl = `${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/list/`

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(`${apiUrl}?page=${currentPage}`)
				if (!response.ok) {
					throw new Error(`HTTP xato! Status: ${response.status}`)
				}
				const data: ApiResponse = await response.json()
				setNews(data.results)
				setTotalPages(Math.ceil(data.count / newsPerPage))
			} catch (error: unknown) {
				console.error('So`rovda xatolik yuz berdi:', (error as Error).message)
			}
		}

		fetchNews()
	}, [apiUrl, currentPage, locale])

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	// Dinamik paginatsiya uchun sahifalarni hisoblash
	const getDisplayedPages = () => {
		const pages = []
		const maxDisplayedPages = 10 // Bir vaqtda ko'rsatiladigan sahifalar soni
		let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
		let endPage = startPage + maxDisplayedPages - 1

		if (endPage > totalPages) {
			endPage = totalPages
			startPage = Math.max(1, endPage - maxDisplayedPages + 1)
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i)
		}

		return pages
	}

	return (
		<div className='min-h-screen bg-[#ffffff] dark:bg-gray-600'>
			<div className='container mx-auto px-4 md:px-8 py-24'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{news.map(item => (
						<Link key={item.id} href={`/news/${item.slug}`} className='group'>
							<div className='bg-white dark:bg-gray-500 rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300 group'>
								<div className='relative h-48'>
									<Image
										src={item.image}
										alt={item.title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-6 h-[140px] border-t'>
									<p className='text-xl dark:text-white font-semibold mb-2 text-blue-600 transition-colors duration-300 max-2xl:text-base group-hover:text-green-600'>
										{item.title.slice(0, 20) + '...'}
									</p>
									<p className='text-gray-600 mb-4'>{item.description}</p>
									<div className='flex items-center justify-between text-sm dark:text-white text-gray-500'>
										<span>✍️ {item.author_post}</span>
										<span className='text-blue-800 font-semibold dark:text-white'>
											📅{' '}
											{new Date(item.created_at)
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
					))}
				</div>
				{/* Dinamik Paginatsiya */}
				<div className='flex justify-center mt-6 space-x-2'>
					{/* Oldingi sahifaga o'tish tugmasi */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						⬅️ Oldingi
					</button>

					{/* Sahifalar ro'yxati */}
					{getDisplayedPages().map(page => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === page
								? 'bg-blue-600 text-white'
								: 'bg-white text-blue-600 hover:bg-blue-100'
								}`}
						>
							{String(page).padStart(2, '0')}
						</button>
					))}

					{/* Keyingi sahifaga o'tish tugmasi */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Keyingi ➡️
					</button>
				</div>
			</div>
		</div>
	)
}
