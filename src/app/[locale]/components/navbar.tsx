/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/app/[locale]/components/ui/accordion'
import {
	Select,
	SelectContent,
	SelectTrigger,
} from '@/app/[locale]/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/app/[locale]/components/ui/sheet'

import { Menu, Moon, Search, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import logo from '../../../images/logo.png'
import { navLink } from '../constants'
import Language from './ui/language'
interface NewsItem {
	title: string
	// boshqa xususiyatlar
}

interface NewsResponse {
	results: NewsItem[]
}

function Navbar() {
	const t = useTranslations()

	const params = useParams()
	const locale = (params?.locale as string) || 'uz'
	const [searchQuery, setSearchQuery] = useState('')
	const [news, setNews] = useState<NewsResponse | null>(null)
	const [showResults, setShowResults] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchResults, setSearchResults] = useState<any[]>([])
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Yangiliklarni API dan olish
	useEffect(() => {
		const apiLocale = locale === 'oz' ? 'uz' : locale
		const apiUrl = `${process.env.NEXT_PUBLIC_SERVER}/${apiLocale}/api/news/list/`
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				setNews(data)
			})
			.catch(error => {
				console.error('Error fetching news:', error)
			})
	}, [])

	useEffect(() => {
		setMounted(true)
	}, [])

	// Qidiruv funksiyasi
	// Qidiruv funksiyasi
	const searchRef = useRef<HTMLDivElement>(null)

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchQuery.trim()) {
			setShowResults(false)
			setIsSearchOpen(false)
			return
		}

		const searchTerm = searchQuery.toLowerCase()
		const filteredNews =
			news?.results?.filter(
				item => item.title && item.title.toLowerCase().includes(searchTerm)
			) || []

		setSearchResults(filteredNews)
		setShowResults(true)
		setIsSearchOpen(true)

		// ⏬ Click va Scroll event qo‘shish
		const handleOutsideClickOrScroll = (event: Event) => {
			// 🔹 Agar foydalanuvchi qidiruv blokining ichida bossachi? — Hech narsa qilmaymiz
			if (
				searchRef.current &&
				searchRef.current.contains(event.target as Node)
			) {
				return
			}
			setIsSearchOpen(false) // ❌ Input yopiladi
			setShowResults(false) // ❌ Natijalar yashiriladi
		}

		// Event listener qo‘shish
		document.addEventListener('mousedown', handleOutsideClickOrScroll)
		window.addEventListener('scroll', handleOutsideClickOrScroll)

		// 🔹 Tozalash (Unmount yoki keyingi qidiruvda eski eventlar o‘chsin)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClickOrScroll)
			window.removeEventListener('scroll', handleOutsideClickOrScroll)
		}
	}

	// Qidiruv natijasini bosganda
	const handleSearchResultClick = () => {
		setIsSearchOpen(false)
		setShowResults(false)
		setSearchQuery('')
	}
	const [isOpen, setIsOpen] = useState(false) // Sheet holatini boshqarish
	const router = useRouter()

	// Sahifa o'zgarganda Sheet ni yopish
	useEffect(() => {
		if (!router) return // Router tayyor bo'lmaguncha hech narsa qilmaslik
		setIsOpen(false)
	}, [])
	const [openSelectId, setOpenSelectId] = useState(null)

	// Select ochilganda id ni saqlash
	const handleOpen = (id: any) => {
		setOpenSelectId(id)
	}

	// Select yopilganda state ni tozalash
	const handleClose = () => {
		setOpenSelectId(null)
	}

	return (
		<div className='w-full border-b h-[120px] flex px-2 md:px-10 justify-between items-center shadow-lg gap-2  z-40 bg-white max-md:rounded-none dark:bg-gray-600'>
			{/* Logo */}
			<Link href={'/about-us'}>
				<div className='flex gap-4 -ml-2 items-center max-md:px-2'>
					<span className='text-[28px] max-xl:hidden font-bold dark:text-green-500 text-green-800 w-[450px] text-center'>
						{t('logo')}
					</span>
					<span className='xl:hidden dark:text-green-500 text-green-800 text-center font-bold text-sm'>
						{t('logo')}
					</span>
				</div>
			</Link>

			{/* Desktop menu */}
			<div className='flex gap-0 max-xl:gap-1 items-center'>
				<div className='flex gap-2 items-center max-xl:gap-1 max-lg:hidden'>
					{navLink.map(item => (
						<div
							key={item.id}
							className='flex items-center'
							style={{ lineHeight: 'normal' }} // Line-height ni bir xil sozlash
						>
							{item.links && item.links.length > 0 ? (
								<Select
									open={openSelectId === item.id}
									onOpenChange={isOpen =>
										isOpen ? handleOpen(item.id) : handleClose()
									}
								>
									<SelectTrigger className='border-none bg-none font-medium text-[20px] text-blue-600 hover:text-green-600 dark:text-gray-100'>
										{t(item.title)}
									</SelectTrigger>
									<SelectContent>
										{item.links.map(child => (
											<div
												onClick={() => router.push(child.url)}
												key={child.id}
												className='p-2 hover:bg-green-100 cursor-pointer dark:hover:bg-gray-800 rounded-md'
											>
												<Link href={child.url} onClick={handleClose}>
													{t(child.title)}
												</Link>
											</div>
										))}
									</SelectContent>
								</Select>
							) : (
								<Link
									href={item.url}
									className='border-none bg-none font-medium text-[20px] text-blue-600 hover:text-green-600 dark:text-gray-100 whitespace-nowrap flex h-9 w-full items-center justify-between  rounded-md border border-input bg-transparent px-1 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1' // Qator bo'lib ketmasligi uchun
								>
									{t(item.title)}
								</Link>
							)}
						</div>
					))}
				</div>

				<div className='flex items-center gap-2'>
					{/* Qidiruv */}
					<div className='relative'>
						<button
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className='p-2 dark:hover:bg-gray-400 hover:bg-gray-100 rounded-full transition-colors'
						>
							<Search className='size-6 text-gray-500 dark:text-white hover:text-blue-600' />
						</button>

						{isSearchOpen && (
							<div
								ref={searchRef}
								className='absolute top-full right-0 max-sm:-ml-32 max-md:left-0 mt-2 bg-white dark:bg-gray-400 rounded-lg shadow-lg p-4 z-50 min-w-[300px]'
							>
								<form onSubmit={handleSearch}>
									<input
										type='text'
										value={searchQuery}
										onChange={e => setSearchQuery(e.target.value)}
										placeholder='Qidirish...'
										className='w-full p-2 border rounded-md '
									/>
								</form>
								{showResults && searchResults.length > 0 && (
									<div className='mt-4'>
										{searchResults.map(result => (
											<div
												key={result.id}
												className='p-2 hover:bg-gray-100 rounded-md'
											>
												<Link
													href={`/${locale}/news/${result.slug}`}
													onClick={handleSearchResultClick}
													className='dark:text-black'
												>
													{result.title}
												</Link>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
					{/* Theme toggler */}
					<button
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className='px-2 py-1 rounded-sm bg-gray-200 dark:bg-gray-800'
					>
						{mounted && theme === 'dark' ? (
							<Sun size={20} />
						) : (
							<Moon size={20} />
						)}
					</button>
					<Language />
				</div>

				{/* Mobile menu */}
				<div className='lg:hidden'>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger>
							<Menu className='size-9 mt-1 text-blue-600' />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>
									<div className='flex gap-4 items-center'>
										<Image src={logo} alt='' width={60} height={40} />
										<span className='text-3xl'>UzFK</span>
									</div>
								</SheetTitle>
							</SheetHeader>
							{navLink.map(item => (
								<Accordion key={item.id} type='single' collapsible>
									<AccordionItem value={`${item.id}`}>
										{item.links ? (
											<>
												<AccordionTrigger className='px-2'>
													{t(item.title)}
												</AccordionTrigger>
												<AccordionContent className='space-y-2'>
													{item.links.map(child => (
														<div key={child.id} className='space-y-2'>
															<Link
																href={`${child.url}`}
																className='p-2 px-3 hover:bg-green-600 rounded-md transition-all hover:text-white'
																onClick={() => setIsOpen(false)}
															>
																{t(child.title)}
															</Link>
														</div>
													))}
												</AccordionContent>
											</>
										) : (
											<Link
												href={`${item.url}`}
												className='p-2 hover:bg-green-600 rounded-md transition-all hover:text-white block'
												onClick={() => setIsOpen(false)}
											>
												{t(item.title)}
											</Link>
										)}
									</AccordionItem>
								</Accordion>
							))}
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	)
}

export default Navbar
