/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

interface Link {
	url: string
	title_uz: string
	title?: string
	[key: string]: any
}
const CardLinks = () => {
	const locale = useLocale()
	// Holatlarni yaratish
	const [linksArray, setLinksArray] = useState<Link[]>([])
	const [loading, setLoading] = useState(true) // Yuklanish holati
	const [error, setError] = useState(null) // Xato holati

	// Ma'lumotlarni olish uchun useEffect
	useEffect(() => {
		// API fetch qilish
		const fetchLinks = async () => {
			try {
				const apiLocale = locale === 'oz' ? 'uz' : locale
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/links/header/list/`
				)
				if (!response.ok) {
					throw new Error(`Serverda xato: ${response.status}`)
				}
				const data = await response.json()
				setLinksArray(data.results) // Ma'lumotlarni holatga o‘rnatish
			} catch (err: string | any) {
				setError(err) // Xatoni saqlash
			} finally {
				setLoading(false) // Yuklanish tugadi
			}
		}

		fetchLinks()
	}, [locale])

	// Agar yuklanayotgan bo'lsa
	if (loading) {
		return <div>Yuklanmoqda...</div>
	}

	// Agar xato bo'lsa
	if (error) {
		return <div>Xato yuz berdi: {error}</div>
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
			{linksArray.map(link => (
				<div
					key={link.url}
					className='p-4 hover:bg-gray-50 dark:bg-blue-800/40 bg-white shadow-lg group  rounded-lg hover:shadow-lg transition cursor-pointer'
					onClick={() => window.open(link.url, '_blank')}
				>
					<h3 className='text-lg font-semibold text-blue-600 dark:text-white group-hover:text-green-600 '>
						{link.title || link[`title_${locale}`] || link.title_uz}
					</h3>
				</div>
			))}

			{/* Bog'lanish kartasi */}
			<div
				className='p-4 hover:bg-gray-50 dark:bg-blue-800/40 bg-white shadow-lg group rounded-lg hover:shadow-lg transition cursor-pointer'
				onClick={() => window.location.href = `/${locale}/contact`}
			>
				<h3 className='text-lg font-semibold text-blue-600 dark:text-white group-hover:text-green-600'>
					{locale === 'uz' ? "Bog'lanish" : locale === 'oz' ? "Боғланиш" : "Контакты"}
				</h3>
			</div>
		</div>
	)
}

export default CardLinks
