'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface INews {
	id: number
	title_uz: string
	title_oz: string
	title_ru: string
	subtitle_uz: string
	subtitle_oz: string
	subtitle_ru: string
	image: string
	post_uz: string
	post_oz: string
	post_ru: string
	post: string
	author_post: string
	added_at: string
	slug: string
}

export default function NewsDetail() {
	const t = useTranslations()
	const params = useParams()
	const [news, setNews] = useState<INews | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchNewsDetail = async () => {
			try {
				setIsLoading(true)
				setError(null)
				const apiLocale = params.locale === 'oz' ? 'uz' : params.locale
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/${apiLocale}/news?slug=${params.slug}`
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				// API bir xil slug bo'yicha birinchi topilgan yangilikni olish
				setNews(Array.isArray(data) && data.length > 0 ? data[0] : null)
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Yangilik yuklanishida xatolik'
				)
				console.error('Error fetching news detail:', err)
			} finally {
				setIsLoading(false)
			}
		}

		if (params.slug) {
			fetchNewsDetail()
		}
	}, [params.slug, params.locale])

	if (isLoading) {
		return (
			<div className='max-w-7xl mx-auto h-full flex items-center justify-center py-24'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		)
	}

	if (error || !news) {
		return (
			<div className='max-w-7xl mx-auto h-full flex items-center justify-center py-24'>
				<div className='text-red-500 text-center'>
					<h2 className='text-2xl font-bold mb-2'>{t('contact_error_message')}</h2>
					<p>{error || t('not_found')}</p>
					<Link
						href='/'
						className='text-blue-500 hover:text-blue-700 mt-4 inline-block'
					>
						{t('nav1')}
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='max-w-7xl mx-auto py-12 px-4'>
			<div className='mb-8'>
				<Link href='/' className='text-blue-500 hover:text-blue-700'>
					← {t('nav1')}
				</Link>
			</div>

			<article className='bg-white rounded-lg shadow-lg overflow-hidden'>
				<div className='relative w-full h-[400px]'>
					<Image
						src={news.image}
						alt={params.locale === 'ru' ? news.title_ru : params.locale === 'oz' ? (news.title_oz || news.title_uz) : news.title_uz}
						fill
						className='object-cover'
						priority
					/>
				</div>

				<div className='p-8'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						{params.locale === 'ru' ? news.title_ru : params.locale === 'oz' ? (news.title_oz || news.title_uz) : news.title_uz}
					</h1>

					<div className='flex items-center text-gray-600 mb-8'>
						<span className='mr-4'>{news.author_post}</span>
						<time dateTime={news.added_at}>
							{new Date(news.added_at).toLocaleDateString(params.locale === 'oz' ? 'uz-UZ' : (params.locale === 'ru' ? 'ru-RU' : 'uz-UZ'), {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
					</div>

					<div className='prose max-w-none'>
						<p className='text-xl text-gray-600 mb-6'>
							{params.locale === 'ru' ? news.subtitle_ru : params.locale === 'oz' ? (news.subtitle_oz || news.subtitle_uz) : news.subtitle_uz}
						</p>
						<div
							className='text-gray-800 leading-relaxed'
							dangerouslySetInnerHTML={{ __html: params.locale === 'ru' ? news.post_ru : params.locale === 'oz' ? (news.post_oz || news.post_uz) : news.post_uz }}
						/>
					</div>
				</div>
			</article>
		</div>
	)
}
