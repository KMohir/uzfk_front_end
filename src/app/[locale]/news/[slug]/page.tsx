import Image from 'next/image'
import HtmlContent from '@/app/[locale]/components/HtmlContent'

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
			<div className='relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]'>
				<Image
					src={news.image}
					alt={news.title}
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end'>
					<div className='container mx-auto px-4 md:px-8 pb-12 md:pb-20'>
						<div className='max-w-4xl'>
							<span className='inline-block px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full mb-4 opacity-0 animate-fade-in-up'>
								UzA
							</span>
							<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md opacity-0 animate-fade-in-up animation-delay-100'>
								{news.title}
							</h1>

							<div className='flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-200'>
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
			</div>

			{/* Content Section */}
			<article className='container mx-auto px-4 md:px-8 -mt-10 relative z-10'>
				<div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-12'>
					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<div className='text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify'>
							<HtmlContent content={news.post} />
						</div>
					</div>
				</div>
			</article>
		</div>
	)
}
