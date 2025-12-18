import { useTranslations } from 'next-intl'

const Page = () => {
	const t = useTranslations()

	return (
		<div className='flex justify-center bg-[#ffffff] dark:bg-gray-600 p-2'>
			<a
				href='https://fkreestr.uz/login'
				className='text-white text-xl bg-blue-400 h-20 w-full flex justify-center items-center rounded-md'
			>
				{t('farm_info_center')}
			</a>
		</div>
	)
}

export default Page
