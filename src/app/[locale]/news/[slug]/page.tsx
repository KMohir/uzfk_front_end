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
			<div className='relative w-full h-[85vh] lg:h-screen'>
				<Image
					src={news.image}
					alt={news.title}
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end'>
					<div className='container mx-auto px-4 md:px-8 pb-12 md:pb-24'>
						<div className='max-w-4xl'>
							<span className='inline-block px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full mb-4 opacity-0 animate-fade-in-up'>
								UzA
							</span>
							<h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg opacity-0 animate-fade-in-up animation-delay-100'>
								{news.title}
							</h1>

							<div className='flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-lg opacity-0 animate-fade-in-up animation-delay-200'>
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
			<article className='container mx-auto px-4 md:px-8 -mt-20 relative z-10'>
				<div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 lg:p-16'>
					<div className='prose prose-lg md:prose-xl dark:prose-invert max-w-none'>
						<div className='text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200 text-justify font-serif tracking-wide'>
							<HtmlContent content={news.post} />
						</div>
					</div>
				</div>
			</article>
		</div>
	)
}
