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
		<article className='max-md:px-0 px-24 mx-auto bg-white dark:bg-gray-600 py-8'>

			<h1 className='text-4xl text-center font-bold mb-4 text-green-800 dark:text-white'>
				{news.title}
			</h1>
			<div className='flex items-center text-gray-600 mb-8'></div>
			<div className='text-[18px]'>
				<HtmlContent content={news.post} />
			</div>
		</article>
	)
}
