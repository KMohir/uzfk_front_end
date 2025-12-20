import Image from 'next/image'
import HtmlContent from '@/app/[locale]/components/HtmlContent'
import { Link } from '@/i18n/routing'

interface NewsItem {
	id: number
	title: string
	slug: string
	image: string
	created_at: string
	category?: string
}

async function getNews(locale: string, slug: string) {
	const apiLocale = locale === 'oz' ? 'uz' : locale
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/detail/${slug}/`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()
	return data
}

async function getLatestNews(locale: string): Promise<NewsItem[]> {
	const apiLocale = locale === 'oz' ? 'uz' : locale
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/list/?page=1`,
			{ cache: 'no-store' }
		)
		const data = await res.json()
		return data.results?.slice(0, 5) || []
	} catch {
		return []
	}
}

async function getRecommendedNews(locale: string): Promise<NewsItem[]> {
	const apiLocale = locale === 'oz' ? 'uz' : locale
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/most_read/list/`,
			{ cache: 'no-store' }
		)
		const data = await res.json()
		return data.results?.slice(0, 4) || data?.slice(0, 4) || []
	} catch {
		return []
	}
}

interface NewsDetailProps {
	params: Promise<{ locale: string; slug: string }>
}

export default async function NewsDetail({ params }: NewsDetailProps) {
	const { locale, slug } = await params
	const [news, latestNews, recommendedNews] = await Promise.all([
		getNews(locale, slug),
		getLatestNews(locale),
		getRecommendedNews(locale)
	])

	if (!news) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl text-gray-600'>Yangilik topilmadi</div>
			</div>
		)
	}

	return (
		<div className='bg-white dark:bg-gray-900 min-h-screen pb-20 pt-28'>
			<div className='container mx-auto px-4 md:px-8'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Main Content */}
					<article className='flex-1 lg:max-w-[70%]'>
						{/* Category & Date */}
						<div className='flex items-center gap-4 mb-4 text-sm text-gray-500'>
							<span className='text-green-600 font-medium'>
								{news.category || "O'zbekiston"}
							</span>
							<span>|</span>
							<span>
								{new Date(news.created_at).toLocaleDateString('uz-UZ', {
									hour: '2-digit',
									minute: '2-digit',
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								})}
							</span>
							{news.views && (
								<>
									<span>|</span>
									<span>👁 {news.views}</span>
								</>
							)}
						</div>

						{/* Title */}
						<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
							{news.title}
						</h1>

						{/* Main Image */}
						<div className='relative w-full aspect-video mb-6 rounded-lg overflow-hidden'>
							<Image
								src={news.image}
								alt={news.title}
								fill
								priority
								className='object-cover'
							/>
						</div>

						{/* Content */}
						<div className='prose prose-lg dark:prose-invert max-w-none'>
							<div className='text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200'>
								<HtmlContent content={news.post} />
							</div>
						</div>

						{/* Author */}
						{news.author_post && (
							<div className='mt-6 pt-4 border-t border-gray-200'>
								<p className='text-gray-600'>✍️ {news.author_post}</p>
							</div>
						)}

						{/* Back Link */}
						<div className='mt-8 pt-6 border-t border-gray-200'>
							<Link href='/news' className='text-blue-600 hover:text-blue-800 font-medium'>
								← Barcha yangiliklar
							</Link>
						</div>
					</article>

					{/* Sidebar */}
					<aside className='lg:w-[30%] space-y-8'>
						{/* Tavsiya etamiz */}
						{recommendedNews.length > 0 && (
							<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200'>
									Tavsiya etamiz
								</h3>
								<div className='space-y-4'>
									{recommendedNews.map((item) => (
										<Link
											key={item.id}
											href={`/news/${item.slug}`}
											className='block group'
										>
											<div className='flex gap-3'>
												<div className='relative w-20 h-16 flex-shrink-0 rounded overflow-hidden'>
													<Image
														src={item.image}
														alt={item.title}
														fill
														className='object-cover group-hover:scale-105 transition-transform'
													/>
												</div>
												<div className='flex-1'>
													<p className='text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-green-600 transition-colors'>
														{item.title}
													</p>
													<p className='text-xs text-gray-500 mt-1'>
														{new Date(item.created_at).toLocaleDateString()}
													</p>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}

						{/* So'nggi yangiliklar */}
						{latestNews.length > 0 && (
							<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200'>
									So&apos;nggi yangiliklar
								</h3>
								<div className='space-y-4'>
									{latestNews.map((item) => (
										<Link
											key={item.id}
											href={`/news/${item.slug}`}
											className='block group'
										>
											<p className='text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-colors line-clamp-2'>
												{item.title}
											</p>
											<p className='text-xs text-gray-500 mt-1'>
												{new Date(item.created_at).toLocaleDateString('uz-UZ', {
													hour: '2-digit',
													minute: '2-digit',
													day: '2-digit',
													month: '2-digit',
													year: 'numeric'
												})}
											</p>
										</Link>
									))}
								</div>
							</div>
						)}
					</aside>
				</div>
			</div>
		</div>
	)
}
