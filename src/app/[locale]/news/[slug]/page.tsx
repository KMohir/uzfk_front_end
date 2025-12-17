import Image from 'next/image'
import HtmlContent from '@/app/[locale]/components/HtmlContent'
import { Link } from '@/i18n/routing'

async function getNews(slug: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER}/ru/api/news/detail/${slug}/`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()
	return data
}

interface NewsDetailProps {
	params: Promise<{ slug: string }>
}

export default async function NewsDetail({ params }: NewsDetailProps) {
	const { slug } = await params
	const news = await getNews(slug)

	if (!news) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl text-gray-600'>Yangilik topilmadi</div>
			</div>
		)
	}

	return (
		<div className='bg-white dark:bg-gray-900 min-h-screen pb-20'>
			{/* Hero Banner Section */}
			<div className='relative w-full h-[60vh] md:h-[70vh]'>
				<Image
					src={news.image}
					alt={news.title}
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
				<div className='absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent'>
					<div className='container mx-auto max-w-5xl'>
						<h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg'>
							{news.title}
						</h1>

						<div className='flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-lg'>
							<div className='flex items-center gap-2'>
								<span className='bg-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
									{news.category || 'Yangiliklar'}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<span>📅 {new Date(news.created_at).toLocaleDateString()}</span>
							</div>
							<div className='flex items-center gap-2'>
								<span>✍️ {news.author_post}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<article className='container mx-auto px-4 md:px-8 py-12 relative z-10'>
				<div className='max-w-4xl mx-auto'>
					<div className='prose prose-lg md:prose-xl dark:prose-invert max-w-none'>
						<div className='text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200 text-justify font-serif tracking-wide'>
							<HtmlContent content={news.post} />
						</div>
					</div>

					{/* Share/Footer Section */}
					<div className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center'>
						<Link href='/news' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
							← Barcha yangiliklar
						</Link>
					</div>
				</div>
			</article>
		</div>
	)
}
