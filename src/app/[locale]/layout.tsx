import Footer from '@/app/[locale]/components/footer'
import Navbar from '@/app/[locale]/components/navbar'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import Ads from './(home)/_components/ads'
import Loader from './components/ui/loader'
import './globals.css'
import MyMarquee from './components/marquee/MyMarquee'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'UzFK',
	description:
		"O'zbekiston fermer, dehqon xo'jaliklari va tomorqa yer egalari kengashi",
	icons: {
		icon: './logo.png',
	},
}

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
	const { locale } = await params
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8fcff] dark:bg-gray-900 text-black dark:text-white`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute='class'>
						{/* Loader-ni birinchi joylashtiramiz */}
						<Loader />
						<div className='max-w-[1400px] mx-auto'>
							<MyMarquee />
							<div className='px-0 bg-white dark:bg-gray-600 md:px-10'>
								{/* Ads komponenti */}
								<div className='block md:hidden bg-gray-100 dark:bg-gray-700 py-2'>
									<Ads />
								</div>
								<div className='hidden md:block'>
									<Ads />
								</div>
							</div>
							<Navbar />
							<main className='bg-white dark:bg-gray-600 text-black dark:text-white'>
								{children}
							</main>
							<Footer />
						</div>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
