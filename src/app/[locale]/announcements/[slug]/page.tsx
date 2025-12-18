'use server'

import HtmlContent from '@/app/[locale]/components/HtmlContent'

async function getAnnouncement(locale: string, slug: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER}/${locale}/api/elon/detail/${slug}`,
		{
			cache: 'no-store',
		}
	)
	if (!res.ok) {
		throw new Error('E`lonni yuklashda xatolik yuz berdi.')
	}
	return res.json()
}

interface AnnouncementDetailProps {
	params: Promise<{ locale: string; slug: string }>
}

export default async function AnnouncementDetail({
	params,
}: AnnouncementDetailProps) {
	const { locale, slug } = await params
	try {
		const announcement = await getAnnouncement(locale, slug)

		if (!announcement) {
			return (
				<div className='flex justify-center items-center min-h-screen'>
					<div className='text-xl text-gray-600'>E`lon topilmadi</div>
				</div>
			)
		}

		return (
			<article className='max-w-4xl mx-auto px-4 py-8'>
				{/* <div className='relative w-full h-[400px] mb-8'>
					<Image
						src={announcement.image}
						alt={announcement.title}
						fill
						className='object-cover rounded-lg'
						priority
					/>
				</div>
				<h1 className='text-4xl font-bold mb-4 text-blue-400 dark:text-white'>
					{announcement.title}
				</h1> */}
				<div className='flex items-center text-gray-600 mb-8'>
					<span className='mr-4'>{announcement.location}</span>
					<time>{announcement.date}</time>
				</div>
				<div className=''>
					<p className='text-xl text-gray-600 mb-6'>
						{announcement.description}
					</p>
					<div className='prose max-w-none'>
						<HtmlContent content={announcement.post} />
					</div>
				</div>
			</article>
		)
	} catch (error) {
		console.error('Xatolik:', error)
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl text-red-600'>
					E`lonni yuklashda xatolik yuz berdi.
				</div>
			</div>
		)
	}
}
