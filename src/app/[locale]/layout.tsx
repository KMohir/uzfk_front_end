import Header from '@/app/[locale]/components/layout/Header'
import Footer from '@/app/[locale]/components/layout/Footer'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import Loader from './components/ui/loader'
import './globals.css'

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
	title: 'UzFK - O\'zbekiston Fermerlar Kengashi',
	description: 'O\'zbekiston fermer, dehqon xo\'jaliklari va tomorqa yer egalari kengashi rasmiy portali',
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
		<html lang={locale} suppressHydrationWarning className='scroll-smooth'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-foreground grain-overlay`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
						<Loader />
						<div className='min-h-screen flex flex-col font-sans'>

							<Header />

							<main className='flex-grow pt-[120px] md:pt-[140px]'>

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
