'use client'

import { useActionState } from 'react'
import { sendMessageToTelegram } from './actions'
import { useEffect, useState } from 'react'

function Page() {
	const [state, formAction, isPending] = useActionState(sendMessageToTelegram, {
		success: false,
		message: '',
	})

	const [number, setNumber] = useState('')
	const [error, setError] = useState<string>('')

	useEffect(() => {
		if (state.message) {
			alert(state.message)
			if (state.success) {
				setNumber('')
				// Reset other fields via form key or ref if needed, but for simplicity relying on native form reset behavior if wrapped in <form> properly or just manual reset isn't strictly needed for server actions if we don't fully control input value state.
				// However, to keep it simple and consistent with previous behavior, let's keep inputs usage.
				// Actually, with Server Actions, it's better to use native form or control inputs.
				// Let's stick to the previous controlled input pattern but feed formData to action.
			}
		}
	}, [state])

	// We need to keep controlled inputs for validation (phonex regex)
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [msgText, setMsgText] = useState('')

	useEffect(() => {
		if (state.success) {
			setName('')
			setAddress('')
			setMsgText('')
		}
	}, [state.success])

	const uzbekPhoneRegex = /^\+?998[0-9]{9}$/

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setNumber(value)
		if (value === '') {
			setError('')
		} else if (!uzbekPhoneRegex.test(value)) {
			setError('To‘g‘ri raqam kiriting. Masalan: +998901234567')
		} else {
			setError('')
		}
	}

	return (
		<div>
			<section className='text-gray-600 body-font relative'>
				<div className='absolute inset-0 bg-gray-300'>
					<iframe
						width='100%'
						height='100%'
						frameBorder='0'
						title='map'
						scrolling='no'
						src='https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5994.115985172911!2d69.27529000000001!3d41.307602!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE4JzI3LjQiTiA2OcKwMTYnMzEuMCJF!5e0!3m2!1suz!2s!4v1738065508433!5m2!1suz!2'
					></iframe>
				</div>
				<div className='container px-5 py-24 mx-auto flex'>
					<div className='lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-600 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md max-md:hidden'>
						<h2 className='text-gray-900 dark:text-white text-lg mb-1 font-medium title-font'>
							Online qabulxona
						</h2>
						<p className='leading-relaxed mb-5 text-gray-600 dark:text-white'>
							Iltimos, ma’lumotlaringizni kiriting:
						</p>

						<form action={formAction}>
							{/* Ism */}
							<div className='relative mb-4'>
								<label
									htmlFor='name'
									className='leading-7 text-sm text-gray-600 dark:text-white'
								>
									Ism Familya
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>

							{/* Familiya */}
							<div className='relative mb-4'>
								<label
									htmlFor='surname'
									className='leading-7 text-sm text-gray-600 dark:text-white'
								>
									Manzil
								</label>
								<input
									type='text'
									id='address'
									name='address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>

							{/* Telefon raqam */}
							<div className='relative mb-4'>
								<label
									htmlFor='number'
									className='leading-7 text-sm text-gray-600 dark:text-white'
								>
									Telefon raqam
								</label>
								<input
									type='tel'
									id='number'
									name='number'
									value={number}
									onChange={handleChange}
									placeholder='+9989x xxx xx xx '
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
								{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
							</div>

							{/* Murojaat */}
							<div className='relative mb-4'>
								<label
									htmlFor='message'
									className='leading-7 text-sm text-gray-600 dark:text-white'
								>
									Murojaat
								</label>
								<textarea
									id='message'
									name='message'
									value={msgText}
									onChange={(e) => setMsgText(e.target.value)}
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
								></textarea>
							</div>

							<button
								type='submit'
								disabled={isPending}
								className='text-white bg-indigo-500 dark:text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50'
							>
								{isPending ? 'Yuborilmoqda...' : 'Yuborish'}
							</button>
							<p className='text-xs text-gray-500 mt-3 dark:text-white'>
								Murojaatingizni yuboring, biz siz bilan 24 soat ichida bog‘lanamiz
							</p>
						</form>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Page
