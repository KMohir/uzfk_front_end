'use client'
import { Facebook, Instagram, Send, Twitter, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'
export default function Footer() {
	const t = useTranslations()
	return (
		<footer className='bg-white dark:bg-gray-600 text-gray-600 py-8 mt-12'>
			<div className='container mx-auto px-0'>
				<div className='flex gap-10 px-2 justify-between max-md:flex-col max-md:justify-center max-md:items-center'>
					<div className='w-full mb-8 md:mb-0 px-10'>
						<h3 className='text-lg font-semibold mb-4 text-blue-800 dark:text-white'>
							{t('contact')}
						</h3>
						<a className='mb-2 dark:text-white' href='tel:+998711234567'>
							{t('phone')}:{' '}
							<span className='text-blue-800 dark:text-white font-bold'>
								+998 71-233-06-18
							</span>
						</a>
						<br />
						<a className='mb-2 dark:text-white' href='tel:+998711234567'>
							{t('phoneTwo')}:{' '}
							<span className='text-blue-800 dark:text-white font-bold'>
								+998 71-233-07-14
							</span>
						</a>
						<br />
						<a className='mb-2 dark:text-white' href='mailto:info@uzfk.uz'>
							{t('email')}:{' '}
							<span className='text-blue-800 dark:text-white font-bold'>
								info@uzfk.uz, fermer@exat.uz
							</span>
						</a>
						<p className=' dark:text-white'>
							{t('address')}:{' '}
							<span className='text-blue-800 dark:text-white font-bold'>
								{t('addressTwo')}
							</span>
						</p>
					</div>
					<div className='w-full md:w-[34%] max-md:px-10'>
						<h3 className='text-lg font-semibold mb-4 text-blue-800 dark:text-white'>
							{t('social')}
						</h3>
						<div className='flex space-x-4'>
							<a
								href='https://www.facebook.com/uzbfermer'
								className='text-gray-600 dark:text-white hover:text-gray-800'
							>
								<Facebook className='size-8 hover:text-blue-600' />{' '}
							</a>
							<a
								href='https://www.instagram.com/uzbekiston_fermerlar_kengashi/'
								className='text-gray-600 dark:text-white hover:text-gray-800'
							>
								<Instagram className='size-8 hover:text-red-600' />
							</a>
							<a
								href='https://twitter.com/UzFermerKengash'
								className='text-gray-600 dark:text-white hover:text-gray-800'
							>
								<Twitter className='size-8 hover:text-blue-950' />
							</a>
							<a
								href='https://t.me/info_uzfk'
								className='text-gray-600 dark:text-white hover:text-gray-800'
							>
								<Send className='size-8 hover:text-blue-600' />
							</a>
							<a
								href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
								className='text-gray-600 dark:text-white hover:text-gray-800'
							>
								<Youtube className='size-8 hover:text-red-600' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
